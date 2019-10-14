import React from "react";
import Photos from "../Components/Photos";
import Home from "../Components/Home";
import Users from "../Components/Users";
import CreateUser from "../Components/CreateUser";
import UpdateUser from "../Components/UpdateUser";

import Title from "antd/lib/typography/Title";

const style = { textAlign: "center", marginTop: "20px" };

// tham khao breadcrumb: https://tylermcginnis.com/react-router-sidebar-breadcrumbs/
export const routes = [
  {
    path: "/photos",
    component: () => <Photos />,
    main: () => <Title style={style}>Photos Album</Title>,
    exact: true
  },
  {
    path: "/",
    component: () => <Home />,
    main: () => <Title style={style}>Home</Title>,
    exact: true
  },
  {
    path: "/users",
    component: () => <Users />,
    main: () => <Title style={style}>Users List</Title>,
    exact: true
  },
  {
    path: "/users/create",
    component: () => <CreateUser />,
    main: () => <Title style={style}>Create User</Title>,
    exact: true
  },
  {
    path: "/users/update/:id",
    component: () => <UpdateUser />,
    main: () => <Title style={style}>Update User</Title>,
    exact: true
  }
];
