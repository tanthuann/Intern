import React from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

class TopMenu extends React.Component {
  state = {
    path: this.props.location.pathname
  };
  componentDidMount() {
    // Typical usage (don't forget to compare props):
      this.setState({
        path: this.props.location.pathname
      });
  }
  render() {
    const menus = [
      {
        key: "/",
        type: "home",
        path: "/",
        name: "Home"
      },
      {
        key: "/projects",
        type: "appstore",
        path: "/projects",
        name: "Projects"
      }
    ];
    return (
      <Menu
        theme="dark"
        // mode="horizontal"
        defaultSelectedKeys={[this.state.path]}
        style={{ lineHeight: "64px" }}
        mode="inline"
      >
        {menus.map(menu => (
          <Menu.Item key={menu.key}>
            <Icon type={menu.type}></Icon>
            <span>{menu.name}</span>
            <Link to={menu.path}></Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default withRouter(TopMenu);
