import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { Drawer, Button, Form, Input } from "antd";

import { CONFIG_CONSTANTS } from "../config";

const { URL_API } = CONFIG_CONSTANTS;
const DrawerFormApi = props => {
  const {
    title,
    handleCreate,
    handleGet,
    loading,
    update,
    record,
    handleUpdate,
    isTable
  } = props;
  const { getFieldDecorator, validateFields, resetFields } = props.form;
  const [visible, setVisible] = useState(false);
  const [idCreate, setIdCreate] = useState(0);
  const showDrawer = () => {
    axios
      .get(`${URL_API}/${isTable ? "tables" : "apis"}`)
      .then(res => {
        const id = res.data && res.data[res.data.length - 1].id;
        setIdCreate(id + 1);
        setVisible(true);
      })
      .catch(error => error.message);
  };

  const onClose = () => {
    setVisible(false);
    resetFields();
  };

  const onSubmitForm = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        const createSuccess = () => {
          handleGet(props.match.params.projectId);
          setVisible(false);
          resetFields();
        };
        handleCreate(values, createSuccess);
      }
    });
  };

  const onUpdateForm = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        const updateSuccess = () => {
          handleGet(props.match.params.projectId);
          setVisible(false);
          resetFields();
        };
        handleUpdate(values, updateSuccess);
      }
    });
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        {title}
      </Button>
      <Drawer
        title={title}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={500}
      >
        <Form>
          <Form.Item label="Project's Id">
            {getFieldDecorator("projectId", {
              initialValue: props.match.params.projectId
            })(
              <Input
                type="text"
                id="projectId"
                name="projectId"
                //onChange={this.handleInputChange}
                disabled
              />
            )}
          </Form.Item>
          <Form.Item label={isTable ? "Table's Id" : "API's Id"}>
            {getFieldDecorator("id", {
              initialValue: !update ? idCreate : record.id
            })(
              <Input
                type="text"
                id="id"
                name="id"
                //onChange={this.handleInputChange}
                disabled
              />
            )}
          </Form.Item>
          <Form.Item label={isTable ? "Table's name" : "API"}>
            {getFieldDecorator(isTable ? "name" : "url", {
              initialValue: !update ? "" : isTable ? record.name : record.url,
              rules: [
                {
                  required: true,
                  message: `Please input ${
                    isTable ? "name" : "link api"
                  } link api and don't accept spaces`
                }
              ]
            })(
              <Input
                type="text"
                id={isTable ? "name" : "url"}
                name={isTable ? "name" : "url"}
                //onChange={this.handleInputChange}
                allowClear
                //onPressEnter={e => onSubmitForm(e)}
                placeholder={isTable ? "Table name" : "Link API"}
              />
            )}
          </Form.Item>
          <Form.Item label={"Date Create"}>
            {getFieldDecorator("date", {
              initialValue: Date(Date.now())
            })(<Input type="text" id="date" name="date" disabled />)}
          </Form.Item>
        </Form>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            background: "#fff",
            textAlign: "right"
          }}
        >
          <Button onClick={() => onClose()} style={{ marginRight: 8 }}>
            Cancel
          </Button>

          <Button
            loading={loading}
            onClick={e => (update ? onUpdateForm(e) : onSubmitForm(e))}
            type="primary"
          >
            {!update ? "Submit" : "Update"}
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Form.create()(withRouter(DrawerFormApi));
