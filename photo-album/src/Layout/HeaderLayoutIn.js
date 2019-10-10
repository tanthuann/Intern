import React, { Component } from "react";

import { Layout, Icon } from "antd";

import '../App.css'

const { Header } = Layout;

export default class HeaderLayoutIn extends Component {

  render() {
    return (
      <Header style={{ background: "#fff", padding: "0" }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.props.toggle}
        />
      </Header>
    );
  }
}
