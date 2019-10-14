import React from "react";
import {
  HashRouter as Router,
  Link,
  withRouter
} from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadcumbComponent = withRouter(props => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((item, index) => {
    if (pathSnippets[index - 1] === "update") {
      return <span key={item}>{item}</span>;
    }
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {item !== 'update' && <Link to={url}>{item.replace(/\b\w/g, l => l.toUpperCase())}</Link> }
        {item === 'update' && 'Update'}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
});

export default BreadcumbComponent;
