import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  HashRouter as Router,
  Link,
  withRouter
} from "react-router-dom";

import { updateUser, getUsers } from "../actions/userActions";

import { Input, Button, Radio, Form, Modal, Alert } from "antd";

//const { confirm } = Modal;

class UpdateUser extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      gender: "",
      redirect: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const id = props.match.params.userId;
    console.log(id);
    const [{ id: userId, name, email, gender }] = props.data.filter(
      user => user.id === parseInt(id)
    );
    return {
      id: userId,
      name,
      email,
      gender
    };
  }

  // componentDidMount() {
  //   const id = this.props.match.params.userId;
  //   console.log(id);
  //   const [{ id: userId, name, email, gender }] = this.props.data.filter(
  //     user => user.id === parseInt(id)
  //   );

  //   su dung ham static -> thua`
  //   this.setState({
  //     id: userId,
  //     name,
  //     email,
  //     gender
  //   });
  // }

  onUpdateUser = e => {
    const { id } = this.state;
    //this.props.updateUser(id, name, email, gender, callback);
    const callback = () => {
      this.setState({
        redirect: true
      });
    };
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      console.log({ errors, values });
      if (!errors) {
        const { name, email, gender } = values;
        Modal.confirm({
          title: "Do you want to update these items?",
          content: "",
          okText: "Yes",
          cancelText: "No",
          onOk: () => {
            this.props.updateUser(id, name, email, gender, callback);
          }
        });
        console.log("Update success !!!");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {loading, error} = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/users" />;
    }
    return (
      <Form style={{ padding: "0 20%" }}>
        {error && (
          <Alert
            message="Error"
            description="Error updating user"
            type="error"
            showIcon
            closable
          />
        )}
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            initialValue: this.state.name,
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
              placeholder={"Your name"}
              allowClear
            />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            initialValue: this.state.email,
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
            initialValue: this.state.gender,
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
          style={{
            backgroundColor: "#95de64",
            color: "#52c41a",
            border: "1px solid #52c41a"
          }}
          loading={loading}
          onClick={e => this.onUpdateUser(e)}
          ghost
          //disabled={check}
        >
          Update
        </Button>
      </Form>
    );
  }
}

UpdateUser = Form.create({})(UpdateUser);

const mapStateToProps = state => ({
  data: state.userReducers.users,
  loading: state.loadingReducers.loading
});

const mapDispatchToProps = {
  getUsers,
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateUser));
