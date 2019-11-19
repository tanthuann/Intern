import React from "react";
import { withRouter } from "react-router-dom";

import { Menu, Button, Dropdown, Icon, notification, Modal } from "antd";
//import DrawerFormProject from '../components/DrawerFormProject';

const MenuActions = props => {
  const {
    record,
    handleDelete,
    handleGet,
    render,
    title,
    project,
    isTypeTable
  } = props;
  const showDeleteConfirm = () => {
    Modal.confirm({
      centered: true,
      title: `Are you sure delete this ${title}?`,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const triggerDeletedSuccess = () => {
          const idGet = project
            ? props.match.params.projectId
            : isTypeTable
            ? props.match.params.tableId
            : props.match.params.apiId;
          handleGet(idGet);
          notification["warning"]({
            message: `You deleted ${title} have id: ${record.id}`,
            description: "!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            //Set time (number)
            duration: 3
          });
        };
        handleDelete(record.id, triggerDeletedSuccess);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => showDeleteConfirm()} type="danger">
          Delete
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        {/* Render Edit button use DrawerForm */}
        {render && render()}
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <span
        className="ant-dropdown-link"
        style={{ height: "20px", color: "blue" }}
      >
        <Icon style={{ fontSize: "20px" }} type="more" />
      </span>
    </Dropdown>
  );
};

export default withRouter(MenuActions);
