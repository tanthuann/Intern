import React, { useState } from "react";
import { Drawer, Button, Form, Input } from "antd";

const DrawerFormProject = props => {
  const {
    title,
    createProject,
    getProjects,
    loading,
    update,
    record,
    updateProject
  } = props;
  const { getFieldDecorator, validateFields, resetFields } = props.form;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        const createSuccess = () => {
          getProjects();
          setVisible(false);
          resetFields();
        };
        createProject(values, createSuccess);
      }
    });
  };

  const onUpdateForm = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        const updateSuccess = () => {
          getProjects();
          setVisible(false);
          resetFields();
        };
        updateProject(values, updateSuccess);
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
          <Form.Item label="Project's Id">
            {getFieldDecorator("id", {
              initialValue: !update ? props.id + 1 : record.id
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
          <Form.Item label="Project's Name">
            {getFieldDecorator("name", {
              initialValue: !update ? "" : record.name,
              rules: [
                {
                  whitespace: true,
                  min: 8,
                  message: "Name must 8 character"
                },
                {
                  max: 50,
                  message: "Name too long"
                },
                {
                  required: true,
                  message: "Please input project name and don't accept spaces"
                }
              ]
            })(
              <Input
                type="text"
                id="name"
                name="name"
                //onChange={this.handleInputChange}
                allowClear
                onPressEnter={e => onSubmitForm(e)}
                placeholder={"Project name"}
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

export default Form.create()(DrawerFormProject);
