import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout, Icon, BackTop } from "antd";

import store from "./store";

//Components
import SiderLayout from "./Layout/SiderLayout";
import HeaderLayoutIn from "./Layout/HeaderLayoutIn";
import ContentLayoutIn from "./Layout/ContentLayoutIn";

//CSS
import "antd/dist/antd.css";
import "./App.css";

//const {Title, Paragraph } = Typography;
const { Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Layout style={{ minHeight: "100vh" }}>
          <Router>
            <SiderLayout collapsed={this.state.collapsed} />
            <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
              <HeaderLayoutIn
                collapsed={this.state.collapsed}
                toggle={this.toggle}
              />
              <ContentLayoutIn />
              <Footer className="" style={{ textAlign: "center", margin: "auto" }}>
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
}

export default App;
