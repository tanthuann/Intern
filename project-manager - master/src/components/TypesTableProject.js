import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Table, Input, Button, Icon, Spin } from "antd";

import { getTypesTable, createTypeTable, deleteTypeTable, updateTypeTable } from "../actions/tableActions";
import MenuActions from "./MenuActions";
import DrawerFormTypeTable from "./DrawerFormTypeTable";

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
        this.props.data[0].tableId !== parseInt(this.props.match.params.tableId)
      ) {
        this.props.getTypesTable(this.props.match.params.tableId);
        return;
      }
      return;
    }
    this.props.getTypesTable(this.props.match.params.tableId);
  }

  render() {
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
        title: "Variable",
        dataIndex: "variable",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.variable.length - b.variable.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("variable")
      },
      {
        title: "Type",
        dataIndex: "type",
        sorter: (a, b) => a.type.length - b.type.length,
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("type")
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
              <MenuActions
                isTypeTable={true}
                record={record}
                handleDelete={this.props.deleteTypeTable}
                handleGet={this.props.getTypesTable}
                loading={loadingButton}
                render={() => (
                  <DrawerFormTypeTable
                    record={record}
                    title="Edit Action Api"
                    update={true}
                    handleGet={this.props.getTypesTable}
                    handleUpdate={this.props.updateTypeTable}
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
        <DrawerFormTypeTable
            title="Create Action Api"
            id={"idLastApi"}
            handleCreate={this.props.createTypeTable}
            handleGet={this.props.getTypesTable}
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
  const { dataTypes, loading, error, loadingButton } = state.tableReducers;
  return {
    data: dataTypes,
    loading,
    error,
    loadingButton
  };
};

const mapDispatchToProps = {
  getTypesTable,
  createTypeTable,
  updateTypeTable,
  deleteTypeTable
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiProject);
