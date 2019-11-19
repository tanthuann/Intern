//LIBRARY
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

//UI
import { Layout, Icon, BackTop } from "antd";

//
import store from "./store";

//COMPONENTS
import SiderLayout from "./layout/SiderLayout";
import HeaderLayoutIn from "./layout/HeaderLayoutIn";
import ContentLayoutIn from "./layout/ContentLayoutIn";

//CSS
import "antd/dist/antd.css";
import './App.css'

const { Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Provider store={store}>
        <Layout style={{ minHeight: "100vh" }}>
          <Router>
            <SiderLayout collapsed={collapsed} />
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
              <HeaderLayoutIn
                collapsed={collapsed}
                toggle={() => setCollapsed(!collapsed)}
              />
              <ContentLayoutIn />
              <Footer
                className=""
                style={{ textAlign: "center", margin: "auto" }}
              >
                Demo ©2019 Created by z01nn
              </Footer>
            </Layout>
            
             
            
          </Router>
        </Layout>
        <BackTop>
          <div className="ant-back-top-inner">
            <Icon type="up" />
          </div>
        </BackTop>
      </Provider>
  );
}

export default App;
