import React from 'react';
import { Menu } from 'antd';
import { BrowserRouter as  Link } from "react-router-dom";

export default function(){
    return(
        <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/photos">Photos</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/users">Users</Link></Menu.Item>
      </Menu>
    );
}