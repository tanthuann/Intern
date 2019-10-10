import React from "react";
import { connect } from "react-redux";
import { deleteUser, getUsers } from "../actions/userActions";

import {
  Table,
  Typography,
  Input,
  Button,
  Icon,
  Popconfirm
} from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

//Contants
import { LIMIT_USERS } from "../constants/constants";

//Components
//import CreateUser from './CreateUser';

const { Title } = Typography;

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageNumber) {
    //let startUser;
    let startUser = LIMIT_USERS * (pageNumber.current - 1);
    this.props.getUsers(startUser);
    console.log("???", pageNumber);
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
    const data = [...this.props.data];
    console.log("ham handle :", data);
    //this.setState({ data: data.filter(item => item.key !== key) });
    this.props.deleteUser(id);
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { data } = this.props;
    console.log(data);
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.id - b.id,
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
        title: "User Name",
        dataIndex: "username",
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.username.length - b.username.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("username")
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
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <Button type="danger" ghost>
                Delete
              </Button>
            </Popconfirm>
          ) : null
      }
    ];
    return (
      <>
        <Title style={{ textAlign: "center", marginTop: "20px" }}>
          Users List
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          onChange={this.onChangePage}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  // FIXME: state.datas.userReducer
  data: state.userReducers.users
});

const mapDispatchToProps = {
  getUsers,
  deleteUser
}

// HOCs
export default connect(
  mapStateToProps,
  //{ getUsers, deleteUser }
  mapDispatchToProps
)(Users);
