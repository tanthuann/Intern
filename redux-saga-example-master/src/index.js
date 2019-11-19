import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import rootReducers from "./reducers/reducers";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    < App />
  </Provider>,
  document.getElementById("root")
);
