import { combineReducers } from "redux";
import photoReducers from "./photoReducers";
import userReducers from "./userReducers";
import loadingReducers from './loadingReducers';

export default combineReducers({
  userReducers,
  photoReducers,
  loadingReducers
});
