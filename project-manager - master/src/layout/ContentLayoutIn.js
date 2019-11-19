import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Layout } from "antd";

import { routes } from "../routers/routers";

const { Content } = Layout;
class ContentLayoutIn extends Component {
  render() {
    return (
      <Content
        style={{
          margin: "24px 0",
          padding: 24,
          background: "#fff",
          marginBottom: "auto"
        }}
      >
        {routes.map(route => (
          <Route
            key={route.path ? route.path : "something"}
            path={route.path}
            exact={route.exact}
            component={route.breadcrumb}
          />
        ))}
        {routes.map(route => (
          <Route
            key={route.path ? route.path : "something"}
            path={route.path}
            exact={route.exact}            
            component={route.displayTitle}
          ></Route>
        ))}
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path ? route.path : "something"}
              path={route.path}
              exact={route.exact}
              component={route.component}
            ></Route>
          ))}
        </Switch>
      </Content>
    );
  }
}

export default withRouter(ContentLayoutIn);
