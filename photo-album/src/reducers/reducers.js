import { combineReducers } from "redux";
import callAPIFunc from "./callAPIFuncReducer";
import photoReducers from "./photoReducers";
import userReducers from "./userReducers";

export default combineReducers({
  userReducers,
  photoReducers
});
