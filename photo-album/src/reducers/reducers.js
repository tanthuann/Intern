import { combineReducers } from "redux";
import photoReducers from "./photoReducers";
import userReducers from "./userReducers";

export default combineReducers({
  userReducers,
  photoReducers
});
