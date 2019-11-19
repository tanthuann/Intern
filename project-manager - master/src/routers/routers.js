import React from "react";

import Projects from "../components/Projects";
import Home from "../components/Home";
import ApiProject from "../components/ApiProject";
import TableProject from "../components/TableProject";
import ActionsApiProject from "../components/ActionsApiProject";
import TypesTableProject from "../components/TypesTableProject";
import BreadcumbsComponent from "../components/BreadcumbComponent";
import TitlePage from "../components/TitlePage";
import PageError from "../components/PageError";

// tham khao breadcrumb: https://tylermcginnis.com/react-router-sidebar-breadcrumbs/
export const routes = [
  {
    path: "/projects",
    component: () => <Projects />,
    breadcrumb: () => <BreadcumbsComponent />,
    displayTitle: () => <TitlePage>Projects</TitlePage>,
    exact: true
  },
  {
    path: "/projects/:projectId/apis",
    component: () => <ApiProject />,
    breadcrumb: () => <BreadcumbsComponent />,
    displayTitle: name => <TitlePage name={name}>Apis Project</TitlePage>,
    exact: true
  },
  {
    path: "/projects/:projectId/apis/:apiId",
    component: () => <ActionsApiProject />,
    breadcrumb: () => <BreadcumbsComponent />,
    displayTitle: name => <TitlePage>Actions Api </TitlePage>,
    exact: true
  },
  {
    path: "/projects/:projectId/tables",
    component: () => <TableProject />,
    breadcrumb: () => <BreadcumbsComponent />,
    displayTitle: name => <TitlePage>Tables Project </TitlePage>,
    exact: true
  },
  {
    path: "/projects/:projectId/tables/:tableId",
    component: () => <TypesTableProject />,
    breadcrumb: () => <BreadcumbsComponent />,
    displayTitle: name => <TitlePage>Datatypes Table </TitlePage>,
    exact: true
  },
  {
    path: "/",
    component: () => <Home />,
    breadcrumb: () => <BreadcumbsComponent />,
    displayTitle: name => <TitlePage>Home</TitlePage>,
    exact: true
  },
  {
    exact: true,
    component: () => <PageError />
  }
];
