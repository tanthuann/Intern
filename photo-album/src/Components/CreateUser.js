import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createUser } from "../actions/userActions";

import { Input, Button, Radio, Form, Alert } from "antd";

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }
  onCreateUser = e => {
    const callback = () => {
      this.setState({
        redirect: true
      });
    };

    //this.props.createUser(name, email, gender, callback);
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      console.log({ errors, values });
      if (!errors) {
        const { name, email, gender } = values;
        this.props.createUser(name, email, gender, callback);
        console.log("Create success !!!");
      }
    });
  };

  render() {
    //const check = this.checkPermissionClick();
    const { redirect } = this.state;
    const { loading, error } = this.props;
    if (redirect) {
      return <Redirect to="/users" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        
        <Form style={{ padding: "0 20%" }} required>
        {error && (
          <Alert
            message="Error"
            description="Error creating user"
            type="error"
            showIcon
          />
        )}
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              initialValue: "",
              rules: [
                {
                  min: 8,
                  message: "Name must 8 character"
                },
                {
                  max: 50,
                  message: "Name too long"
                },
                {
                  required: true,
                  message: "Please input your Name"
                }
              ]
            })(
              <Input
                type="text"
                id="name"
                name="name"
                //onChange={this.handleInputChange}
                allowClear
                placeholder={"Your name"}
              />
            )}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: "",
              rules: [
                
                {
                  max: 50,
                  message: "Gmail too long"
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                type="email"
                id="email"
                name="email"
                placeholder={"Your email"}
                allowClear
                //onChange={this.handleInputChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              // initialValue: "Male",
              rules: [
                {
                  required: true,
                  message: "Please choose your Gender"
                }
              ]
            })(
              <Radio.Group>
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Button
            type="primary"
            style={{ backgroundColor: "#95de64" }}
            onClick={e => this.onCreateUser(e)}
            ghost
            loading={loading}
            // FIXME: this.props.form.validateFields
            //disabled={this.props.form.validateFields((e,v) => e ? true : false)}
          >
            Create
          </Button>
        </Form>
      </>
    );
  }
}

CreateUser = Form.create({})(CreateUser);

const mapStateToProps = state => ({
  data: state.userReducers.users,
  loading: state.loadingReducers.loading,
  error: state.loadingReducers.error
});

const mapDispatchToProps = {
  createUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
