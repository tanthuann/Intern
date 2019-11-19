// LIBRARY
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

// UI
import { Drawer, Button, Form, Input } from "antd";

// CONSTANTS
import { CONFIG_CONSTANTS } from "../config";
const { URL_API } = CONFIG_CONSTANTS;

const DrawerFormActionApi = props => {
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
  const [idCreate, setIdCreate] = useState(0);

  // Open Drawer and get id last item to create id for new api
  const showDrawer = () => {
    axios
      .get(`${URL_API}/api_detail`)
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
          handleGet(props.match.params.apiId);
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
          handleGet(props.match.params.apiId);
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
          <Form.Item label="Api's Id">
            {getFieldDecorator("apiId", {
              initialValue: props.match.params.apiId
            })(
              <Input
                type="text"
                id="apiId"
                name="apiId"
                disabled
              />
            )}
          </Form.Item>
          <Form.Item label={"Ations's Id"}>
            {getFieldDecorator("id", {
              initialValue: !update ? idCreate : record.id
            })(
              <Input
                type="text"
                id="id"
                name="id"
                disabled
              />
            )}
          </Form.Item>
          <Form.Item label={"Url"}>
            {getFieldDecorator("url", {
              initialValue: !update ? "" : record.url,
              rules: [
                {
                  required: true,
                  message: "Please input url"
                }
              ]
            })(
              <Input
                type="text"
                id={"url"}
                name={"url"}
                allowClear
                onPressEnter={e => onSubmitForm(e)}
                placeholder={"Your url"}
              />
            )}
          </Form.Item>
          <Form.Item label={"Body"}>
            {getFieldDecorator("body", {
              initialValue: !update ? "" : record.body
            })(
              <Input
                type="text"
                id={"body"}
                name={"body"}
                allowClear
                onPressEnter={e => onSubmitForm(e)}
                placeholder={"Your body"}
              />
            )}
          </Form.Item>
          <Form.Item label={"Params"}>
            {getFieldDecorator("params", {
              initialValue: !update ? "" : record.params
            })(
              <Input
                type="text"
                id={"params"}
                name={"params"}
                allowClear
                onPressEnter={e => onSubmitForm(e)}
                placeholder={"Your params"}
              />
            )}
          </Form.Item>
          <Form.Item label={"Method"}>
            {getFieldDecorator("method", {
              initialValue: !update ? "" : record.method,
              rules: [
                {
                  required: true,
                  message: "Please input method"
                }
              ]
            })(
              <Input
                type="text"
                id={"method"}
                name={"method"}
                allowClear
                onPressEnter={e => onSubmitForm(e)}
                placeholder={"Your method"}
              />
            )}
          </Form.Item>
          <Form.Item label={"Note"}>
            {getFieldDecorator("note", {
              initialValue: !update ? "" : record.note
            })(
              <Input
                type="text"
                id={"note"}
                name={"note"}
                allowClear
                onPressEnter={e => onSubmitForm(e)}
                placeholder={"Your note"}
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

export default Form.create()(withRouter(DrawerFormActionApi));
