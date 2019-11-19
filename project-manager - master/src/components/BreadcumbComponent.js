// LIBRARY
import React from "react";
import { HashRouter as Router, Link, withRouter } from "react-router-dom";

// UI
import { Breadcrumb } from "antd";

const BreadcumbComponent = props => {

  //Split url becomes array
  const pathSnippets = props.match.url.split("/").filter(i => i);

  // Set url for each and number is willnt be url, add them become a array
  const extraBreadcrumbItems = pathSnippets.map((item, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {!Number.isInteger(parseInt(item)) ? (
          <Link to={url}>{item.replace(/\b\w/g, l => l.toUpperCase())}</Link>
        ) : item}
      </Breadcrumb.Item>
    );
  });

  //ES6 SPREAD: Spread them become array breadcumb
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
    ...extraBreadcrumbItems
  ];

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

export default withRouter(BreadcumbComponent);
