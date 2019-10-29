import { combineReducers } from "redux";
import ageReducers from './ageReducers'
import commentReducers from './commentReducers'

export default combineReducers({
  ageReducers,
  commentReducers
});