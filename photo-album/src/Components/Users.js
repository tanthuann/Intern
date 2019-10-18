import React from "react";
import { connect } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../actions/userActions";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Table, Input, Button, Icon, Popconfirm, Spin } from "antd";
import Highlighter from "react-highlight-words";

//Contants
import { LIMIT_USERS } from "../constants/constants";

//Components
//import CreateUser from './CreateUser';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      deleted: false
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageNumber) {
    //let startUser;
    let startUser = LIMIT_USERS * (pageNumber.current - 1);
    this.props.getUsers(startUser);
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
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
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
    this.props.deleteUser(id);
  };

  // handleUpdate = id => {
  //   const data = this.props.data.filter(user => user.id === id);
  //   // this.props.updateUser(...data);
  // };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { data, loading } = this.props;
    const columns = [
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
        title: "Gender",
        dataIndex: "gender",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("gender")
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: (a, b) => a.email.length - b.email.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Action",
        dataIndex: "operation",
        render: (text, record) =>
          this.props.data.length >= 1 ? (
            <>
              <Button
                ghost
                style={{
                  marginRight: "5px",
                  color: "#722ed1",
                  border: "1px solid #722ed1"
                }}
              >
                <Link to={`/users/update/${record.id}`}>Edit</Link>
              </Button>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <Button type="danger" ghost>
                  Delete
                </Button>
              </Popconfirm>
            </>
          ) : null
      }
    ];
    return (
      <>
        <Button
          type="primary"
          style={{ width: "200", height: "40px", marginBottom: "10px" }}
        >
          <Link to="/users/create">Create New User</Link>
        </Button>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        > */}
          <Spin tip="Loadingg..." spinning={loading}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
              onChange={this.onChangePage}
            />
          </Spin>
        {/* </div> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.userReducers.users,
  loading: state.loadingReducers.loading,
  errorLoading: state.loadingReducers.error
});

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  updateUser
};

// HOCs
export default connect(
  mapStateToProps,
  //{ getUsers, deleteUser }
  mapDispatchToProps
)(Users);
