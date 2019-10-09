import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "antd";

import store from './store';

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
      <Provider store={store}>
        <Layout>
          <Router>
            <Header>
              <TopMenu />
            </Header>
            <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              ></Route>
            ))}
            </Switch>
          </Router>
        </Layout>
      </Provider>
    );
  }
}

export default App;
