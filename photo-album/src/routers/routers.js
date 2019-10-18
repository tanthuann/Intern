import React from "react";
import Photos from "../Components/Photos";
import Home from "../Components/Home";
import Users from "../Components/Users";
import CreateUser from "../Components/CreateUser";
import UpdateUser from "../Components/UpdateUser";

import Title from "antd/lib/typography/Title";
import BreadcumbComponent from '../Components/BreadcumbComponent';

const style = { textAlign: "center", marginTop: "20px" };


// tham khao breadcrumb: https://tylermcginnis.com/react-router-sidebar-breadcrumbs/
export const routes = [
  {
    path: "/photos",
    component: () => <Photos />,
    breadcrumb: () => <BreadcumbComponent path={"/photos"}/>,
    displayTitle: () => <Title style={style}>Photos Album</Title>,
    exact: true
  },
  {
    path: "/",
    component: () => <Home />,
    // FIXME: dynamic breadcrumb
    breadcrumb: () => <BreadcumbComponent path={"/"}/>,
    displayTitle: () => <Title style={style}>Home</Title>,
    exact: true
  },
  {
    path: "/users",
    component: () => <Users />,
    breadcrumb: () => <BreadcumbComponent path={"/users"}/>,
    displayTitle: () => <Title style={style}>Users List</Title>,
    exact: true
  },
  {
    path: "/users/create",
    component: () => <CreateUser />,
    breadcrumb: () => <BreadcumbComponent path={"/users/create"}/>,
    displayTitle: () => <Title style={style}>Create User</Title>,
    exact: true
  },
  {
    path: "/users/update/:userId",
    component: () => <UpdateUser />,
    breadcrumb: () => <BreadcumbComponent path={"/users/update"}/>,
    displayTitle: () => <Title style={style}>Update User</Title>,
    exact: true
  }
];
