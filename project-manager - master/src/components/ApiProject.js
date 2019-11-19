// LIBRARY
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// UI
import { Table, Input, Button, Icon, Spin } from "antd";

// ACTIONS
import {
  getApis,
  createApi,
  updateApi,
  deleteApi
} from "../actions/apiActions";

// COMPONENTS
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
        this.props.getApis(this.props.match.params.projectId);
        return;
      }
      return;
    }
    this.props.getApis(this.props.match.params.projectId);
  }

  render() {
    // const data = [
    //   {
    //     id: "1",
    //     url: "URL 1",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "2",
    //     url: "URL 2",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "3",
    //     url: "URL 3",
    //     date: Date(Date.now()).toString()
    //   },
    //   {
    //     id: "4",
    //     url: "URL 4",
    //     date: Date(Date.now()).toString()
    //   }
    // ];
    const { data, loading = false, loadingButton } = this.props;
    const columns = [
      {
        title: "STT",
        dataIndex: "id",
        sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("id")
      },
      {
        title: "URL",
        dataIndex: "url",
        sorter: (a, b) => a.url.length - b.url.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("url")
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
                  to={`/projects/${this.props.match.params.projectId}/apis/${record.id}`}
                >
                  View Action
                </Link>
              </Button>
              <MenuActions
                project={true}
                title="api"
                record={record}
                handleDelete={this.props.deleteApi}
                handleGet={this.props.getApis}
                loading={loadingButton}
                render={() => (
                  <DrawerFormApi
                    record={record}
                    title="Edit Api"
                    update={true}
                    handleGet={this.props.getApis}
                    handleUpdate={this.props.updateApi}
                    loading={loadingButton}
                  />
                )}
              />
            </>
          ) : null
      }
    ];
    //const idLastApi = data ? data[data.length - 1].id : 0;
    return (
      <>
        <Spin tip="Loadingg..." spinning={loading}>
          <DrawerFormApi
            title="Create New Project"
            id={"idLastApi"}
            handleCreate={this.props.createApi}
            handleGet={this.props.getApis}
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
  const { data, loading, error, loadingButton } = state.apiReducers;
  return {
    data,
    loading,
    error,
    loadingButton
  };
};

const mapDispatchToProps = {
  getApis,
  createApi,
  updateApi,
  deleteApi
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiProject);
