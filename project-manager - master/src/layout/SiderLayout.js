import React, { Component } from "react";
import { Layout } from "antd";

import TopMenu from "../components/TopMenu";

const { Sider } = Layout;

class SiderLayout extends Component {
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
      >
        <div className="logo" />
        <TopMenu />
      </Sider>
    );
  }
}

export default SiderLayout;
