import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout } from "antd";

//Components
import TopMenu from "./Components/TopMenu";

//CSS
import "antd/dist/antd.css";
import "./App.css";

import { routes } from "./routers/routers";

//const {Title, Paragraph } = Typography;
const { Header, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <Layout>
        <Router>
          <Header>
            <TopMenu />
          </Header>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              ></Route>
            ))}
        </Router>
      </Layout>
    );
  }
}

export default App;
