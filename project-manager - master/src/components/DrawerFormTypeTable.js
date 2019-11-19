import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Drawer, Button, Form, Input } from "antd";
import axios from 'axios'
import { CONFIG_CONSTANTS } from '../config'

const { URL_API } = CONFIG_CONSTANTS;

const DrawerFormTypeTable = props => {
  const {
    title,
    handleCreate,
    handleGet,
    loading,
    update,
    record,
    handleUpdate
  } = props;
  const { getFieldDecorator, validateFields, resetFields } = props.form;
  const [visible, setVisible] = useState(false);
  const [idCreate, setIdCreate] = useState(0)
  const showDrawer = () => {
    axios
      .get(`${URL_API}/table_detail`)
      .then(res => {
        const id = res.data && res.data[res.data.length - 1].id;
        
        setIdCreate(id + 1);
        setVisible(true);
      })
      .catch(error => error.message);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        const createSuccess = () => {
          handleGet(props.match.params.tableId);
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
          handleGet(props.match.params.tableId);
          setVisible(false);
          resetFields();
        };
        handleUpdate(values, updateSuccess);
      }
    });
  };

  const onClose = () => {
    setVisible(false);
    resetFields();
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
          <Form.Item label="Table's Id">
            {getFieldDecorator("tableId", {
              initialValue: props.match.params.tableId
            })(
              <Input
                type="text"
                id="tableId"
                name="tableId"
                //onChange={this.handleInputChange}
                disabled
              />
            )}
          </Form.Item>
          <Form.Item label={"Type's Id"}>
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
          <Form.Item label={"Variable"}>
            {getFieldDecorator("variable", {
              initialValue: !update ? "" : record.variable,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input variable"
                }
              ]
            })(
              <Input
                type="text"
                id={"variable"}
                name={"variable"}
                //onChange={this.handleInputChange}
                allowClear
                //onPressEnter={e => onSubmitForm(e)}
                placeholder={"Type's variable"}
              />
            )}
          </Form.Item>
          <Form.Item label={"Type"}>
            {getFieldDecorator("type", {
              initialValue: !update ? "" : record.type,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input type's name"
                }
              ]
            })(
              <Input
                type="text"
                id={"type"}
                name={"type"}
                //onChange={this.handleInputChange}
                allowClear
                //onPressEnter={e => onSubmitForm(e)}
                placeholder={"Type..."}
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

export default Form.create()(withRouter(DrawerFormTypeTable));
