import { combineReducers } from 'redux';
import callAPIFunc from './callAPIFuncReducer';

export default combineReducers({
    datas: callAPIFunc
})