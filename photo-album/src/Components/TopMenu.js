import React from "react";
import { Menu, Icon } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function() {
  const menus = [
    {
      key: "home",
      type: "home",
      path: "/",
      name: "Home"
    },
    {
      key: "Album",
      type: "picture",
      path: "/photos",
      name: "Album"
    },
    {
      key: "Users",
      type: "user",
      path: "/users",
      name: "Users"
    }
  ];

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["home"]}
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
