// LIBRARY
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// UI
import { Table, Input, Button, Icon, Spin } from "antd";

// ACTIONS
import {
  getActionsApi,
  createActionApi,
  updateActionApi,
  deleteActiosApi
} from "../actions/apiActions";

// COMPONENTS
import MenuActions from "../components/MenuActions";
import DrawerFormActionApi from "./DrawerFormActionApi";

class ApiProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      deleted: false
    };
  }

  // SEARCH OF TABLE
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
    // RENDER HIGHLIGHT TEXT OF SEARCH

    // render: text => (
    //   <Highlighter
    //     highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //     searchWords={[this.state.searchText]}
    //     autoEscape
    //     textToHighlight={text.toString()}
    //   />
    // )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  // LIFECYCLES
  componentDidMount() {
    if (this.props.data) {
      if (
        this.props.data[0].apiId !== parseInt(this.props.match.params.apiId)
      ) {
        this.props.getActionsApi(this.props.match.params.apiId);
        return;
      }
      return;
    }
    this.props.getActionsApi(this.props.match.params.apiId);
  }

  render() {
    const { data, loading = false, loadingButton } = this.props;
    
    // COLUMN OF TABLE
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
        title: "URL",
        dataIndex: "url",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.url.length - b.url.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("url")
      },
      {
        title: "Body",
        dataIndex: "body",
        sorter: (a, b) => a.body.length - b.body.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("body")
      },
      {
        title: "Params",
        dataIndex: "params",
        sorter: (a, b) => a.params.length - b.params.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("params")
      },
      {
        title: "Method",
        dataIndex: "method",
        sorter: (a, b) => a.method.length - b.method.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("method")
      },
      {
        title: "Date",
        dataIndex: "date",
        sorter: (a, b) => parseInt(a.date) - parseInt(b.date),
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("date")
      },
      {
        title: "Note",
        dataIndex: "note",
        ...this.getColumnSearchProps("note")
      },

      {
        title: "Action",
        dataIndex: "operation",
        render: (text, record) =>
          data.length >= 1 ? (
            <>
              <MenuActions
                record={record}
                handleDelete={this.props.deleteActiosApi}
                handleGet={this.props.getActionsApi}
                loading={loadingButton}
                render={() => (
                  <DrawerFormActionApi
                    record={record}
                    title="Edit Action Api"
                    update={true}
                    handleGet={this.props.getActionsApi}
                    handleUpdate={this.props.updateActionApi}
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
          <DrawerFormActionApi
            title="Create Action Api"
            id={"idLastApi"}
            handleCreate={this.props.createActionApi}
            handleGet={this.props.getActionsApi}
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

// REDUX
const mapStateToProps = state => {
  const { dataActions, loading, error, loadingButton } = state.apiReducers;
  return {
    data: dataActions,
    loading,
    error,
    loadingButton
  };
};

const mapDispatchToProps = {
  getActionsApi,
  createActionApi,
  updateActionApi,
  deleteActiosApi
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiProject);
