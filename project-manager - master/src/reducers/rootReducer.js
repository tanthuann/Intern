import { combineReducers } from "redux";
import apiReducers from "./apiReducers";
import projectReducers from "./projectReducers";
import tableReducers from "./tableReducers";

export default combineReducers({
  apiReducers,
  projectReducers,
  tableReducers
});
