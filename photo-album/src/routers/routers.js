import React from "react";
import Photos from "../Components/Photos";
import Home from "../Components/Home";
import Users from "../Components/Users";

// tham khao breadcrumb: https://tylermcginnis.com/react-router-sidebar-breadcrumbs/
export const routes = [
  {
    path: "/photos",
    component: () => <Photos />,
    exact: true
  },
  {
    path: "/",
    component: () => <Home/>,
    exact: true
  },
  {
    path: "/users",
    component: () => <Users/>,
    exact: true
  }
];
