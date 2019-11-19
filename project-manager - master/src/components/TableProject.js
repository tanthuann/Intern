import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Table, Input, Button, Icon, Spin } from "antd";

import {
  getTables,
  deleteTable,
  updateTable,
  createTable
} from "../actions/tableActions";
import MenuActions from "./MenuActions";
import DrawerFormApi from "./DrawerFormApi";

class ApiProject extends Component {
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
    if (this.props.data) {
      if (
        this.props.data[0].projectId !==
        parseInt(this.props.match.params.projectId)
      ) {
        this.props.getTables(this.props.match.params.projectId);
        return;
      }
      return;
    }
    this.props.getTables(this.props.match.params.projectId);
  }

  render() {
    // const data = [
    //   {
    //     id: "1",
    //     name: "users",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "2",
    //     name: "comments",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "3",
    //     name: "photos",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "4",
    //     name: "posts",
    //     date: Date(Date.now()).toString()
    //   }
    // ];
    const { data, loading = false, loadingButton } = this.props;
    const columns = [
      {
        title: "STT",
        dataIndex: "id",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Name",
        dataIndex: "name",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
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
                <Link
                  to={`/projects/${this.props.match.params.projectId}/tables/${record.id}`}
                >
                  View types
                </Link>
              </Button>
              <MenuActions
                project={true}
                title="table"
                record={record}
                handleDelete={this.props.deleteTable}
                handleGet={this.props.getTables}
                loading={loadingButton}
                render={() => (
                  <DrawerFormApi
                    isTable={true}
                    record={record}
                    title="Edit Table"
                    update={true}
                    handleGet={this.props.getTables}
                    handleUpdate={this.props.updateTable}
                    loading={loadingButton}
                  />
                )}
              />
            </>
          ) : null
      }
    ];
    return (
      <>
        <Spin tip="Loadingg..." spinning={loading}>
          <DrawerFormApi
            isTable={true}
            title="Create New Project"
            id={"idLastApi"}
            handleCreate={this.props.createTable}
            handleGet={this.props.getTables}
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

ApiProject = withRouter(ApiProject);

const mapStateToProps = state => {
  const { data, loading, error, loadingButton } = state.tableReducers;
  return {
    data,
    loading,
    error,
    loadingButton
  };
};

const mapDispatchToProps = {
  getTables,
  createTable,
  updateTable,
  deleteTable
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiProject);
