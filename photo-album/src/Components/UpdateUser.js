import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { updateUser, getUsers } from "../actions/userActions";

import { Input, Button, Radio } from "antd";

export class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      gender: "",
      redirect: false
    };
  }
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onUpdateUser = () => {
    const { name, email, gender, id } = this.state;
    this.props.updateUser(id, name, email, gender);
    this.setState({
      redirect: true
    });
  };

  componentDidMount() {
    const id = window.location.pathname.split("/").pop();
    const [{ ...data }] = this.props.data.filter(
      user => user.id === parseInt(id)
    );
    this.setState({
      id: data.id,
      name: data.name,
      email: data.email,
      gender: data.gender
    });
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
        this.props.getUsers();
      return <Redirect to="/users" />;
    }

    return (
      <form>
        <label htmlFor="name">Name:</label>
        <br />
        <Input
          type="text"
          id="name"
          name="name"
          onChange={this.handleInputChange}
          value={this.state.name}
        />
        <br />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <Input
          type="email"
          id="email"
          name="email"
          onChange={this.handleInputChange}
          value={this.state.email}
        />
        <br />
        <br />
        <Radio.Group
          onChange={this.handleInputChange}
          value={this.state.gender}
          name="gender"
        >
          <Radio value={"Male"}>Male</Radio>
          <Radio value={"Female"}>Female</Radio>
        </Radio.Group>{" "}
        <br />
        <br />
        <Button
          type="danger"
          style={{ backgroundColor: "#95de64" }}
          onClick={this.onUpdateUser}
          ghost
        >
          Update
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  data: state.userReducers.users
});

const mapDispatchToProps = {
  getUsers,
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
