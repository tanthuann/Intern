import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";

import { Layout, BackTop, Icon } from "antd";

import { routes } from "./routes//routes";

import TopMenu from "./components/TopMenu";

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <div className="logo" />
            <TopMenu />
          </Sider>
          <Layout style={{marginLeft: "200px"}}>
            <Header></Header>
            <Content
              style={{
                margin: "30px",
                padding: 24,
                background: "#fff",
                marginBottom: "auto"
              }}
            >
              {routes ? (
                routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.displayTitle}
                  />
                ))
              ) : (
                <h1>Error Tilte</h1>
              )}
              {routes ? (
                routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.displayContent}
                  />
                ))
              ) : (
                <h1>Error Content</h1>
              )}
            </Content>
            <Footer
              className=""
              style={{ textAlign: "center", margin: "auto" }}
            >
              Demo ©2018 Created by z01nn
            </Footer>
          </Layout>
          <BackTop>
            <div className="ant-back-top-inner">
              <Icon type="up" />
            </div>
          </BackTop>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorLoadData: state.commentReducers.error
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
