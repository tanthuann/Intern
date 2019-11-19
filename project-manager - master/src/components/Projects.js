import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Table, Input, Button, Icon, Spin, Alert } from "antd";

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject
} from "../actions/projectActions";
import MenuActions from "./MenuActions";
import DrawerFormProject from "./DrawerFormProject";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      deleted: false
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleDelete = id => {
    // this.props.deleteUser(id);
  };

  // handleUpdate = id => {
  //   const data = this.props.data.filter(user => user.id === id);
  //   // this.props.updateUser(...data);
  // };

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    // const data = [
    //   {
    //     id: "1",
    //     name: "Project 1",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "2",
    //     name: "Project 2",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "3",
    //     name: "Project 3",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "4",
    //     name: "Project 4",
    //     date: Date(Date.now()).toString()
    //   }
    // ];
    const { data, loading = false, loadingButton, error } = this.props;
    const columns = [
      {
        title: "STT",
        dataIndex: "id",
        sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Date",
        dataIndex: "date",
        sorter: (a, b) => parseInt(a.date) - parseInt(b.date),
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("date")
      },
      {
        title: "Action",
        dataIndex: "operation",
        render: (text, record) =>
          data.length >= 1 ? (
            <>
              <Button
                ghost
                style={{
                  marginRight: "5px",
                  color: "#722ed1",
                  border: "1px solid #722ed1"
                }}
              >
                <Link to={`/projects/${record.id}/apis`}>API</Link>
              </Button>
              <Button
                ghost
                style={{
                  marginRight: "5px",
                  color: "green",
                  border: "1px solid green"
                }}
              >
                <Link to={`/projects/${record.id}/tables`}>Table</Link>
              </Button>
              <MenuActions
                record={record}
                handleDelete={this.props.deleteProject}
                handleGet={this.props.getProjects}
                loading={loadingButton}
                render={() => (
                  <DrawerFormProject
                    record={record}
                    title="Edit Project"
                    update={true}
                    getProjects={this.props.getProjects}
                    updateProject={this.props.updateProject}
                    loading={loadingButton}
                  />
                )}
              />
            </>
          ) : null
      }
    ];
    const idLast = data ? data[data.length - 1].id : 0;
    return (
      <>
        <Spin tip="Loadingg..." spinning={loading}>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
            />
          )}
          <DrawerFormProject
            title="Create New Project"
            id={idLast}
            createProject={this.props.createProject}
            getProjects={this.props.getProjects}
            loading={loadingButton}
          />

          <Table
            rowKey={"id"}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            onChange={this.onChangePage}
          />
        </Spin>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { data, loading, loadingButton, error } = state.projectReducers;
  return { data, loading, error, loadingButton };
};

const mapDispatchToProps = {
  getProjects,
  createProject,
  deleteProject,
  updateProject
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
