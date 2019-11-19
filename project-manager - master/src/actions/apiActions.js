//Request something
import { makeRequest } from "../api/request";

//URL
import { CONFIG_CONSTANTS } from "../config";

//CONSTANTS
import CONTANTS from "../constants/constants";

const { URL_API } = CONFIG_CONSTANTS;
const {
  FETCH_API_FAIL,
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  CREATE_API_FAIL,
  CREATE_API_REQUEST,
  CREATE_API_SUCCESS,
  DELETE_API_FAIL,
  DELETE_API_REQUEST,
  DELETE_API_SUCCESS,
  UPDATE_API_FAIL,
  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  FETCH_ACTIONS_API_FAIL,
  FETCH_ACTIONS_API_REQUEST,
  FETCH_ACTIONS_API_SUCCESS,
  CREATE_ACTION_API_FAIL,
  CREATE_ACTION_API_REQUEST,
  CREATE_ACTION_API_SUCCESS,
  DELETE_ACTION_API_FAIL,
  DELETE_ACTION_API_REQUEST,
  DELETE_ACTION_API_SUCCESS,
  UPDATE_ACTION_API_FAIL,
  UPDATE_ACTION_API_REQUEST,
  UPDATE_ACTION_API_SUCCESS
} = CONTANTS.APIACTIONS;
/*-----------------------------*/
//REQUESTS API
export const getApis = id =>
  makeRequest({
    url: `${URL_API}/apis`,
    params: {
      projectId: id,
      _embed: "api_detail"
    },
    LOADING_ACTION: FETCH_API_REQUEST,
    SUCCESS_ACTION: FETCH_API_SUCCESS,
    ERROR_ACTION: FETCH_API_FAIL
  });

export const createApi = (values, cbSuccess) =>
  makeRequest({
    method: "POST",
    //url: "https://jsonplaceholder.typicode.com/users",
    url: `${URL_API}/apis`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: CREATE_API_REQUEST,
    SUCCESS_ACTION: CREATE_API_SUCCESS,
    ERROR_ACTION: CREATE_API_FAIL
  });

export const deleteApi = (id, cbSuccses) => {
  return makeRequest({
    method: "DELETE",
    //url: "https://jsonplaceholder.typicode.com/users/1",
    url: `${URL_API}/apis/${id}`,
    cbSuccess: cbSuccses,
    LOADING_ACTION: DELETE_API_REQUEST,
    SUCCESS_ACTION: DELETE_API_SUCCESS,
    ERROR_ACTION: DELETE_API_FAIL
  });
};

export const updateApi = (values, cbSuccess) => {
  return makeRequest({
    method: "PUT",
    url: `https://jsonplaceholder.typicode.com/users/${values.id}`,
    //url: `${URL_API}/apis/${values.id}`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: UPDATE_API_REQUEST,
    SUCCESS_ACTION: UPDATE_API_SUCCESS,
    ERROR_ACTION: UPDATE_API_FAIL
  });
};

/*-----------------------------*/
//REQUESTS ACTIONS API
export const getActionsApi = id =>
  makeRequest({
    url: `${URL_API}/api_detail`,
    params: {
      apiId: id
    },
    LOADING_ACTION: FETCH_ACTIONS_API_REQUEST,
    SUCCESS_ACTION: FETCH_ACTIONS_API_SUCCESS,
    ERROR_ACTION: FETCH_ACTIONS_API_FAIL
  });

export const createActionApi = (values, cbSuccess) =>
  makeRequest({
    method: "POST",
    //url: `https://jsonplaceholder.typicode.com/users`,
    url: `${URL_API}/api_detail`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: CREATE_ACTION_API_REQUEST,
    SUCCESS_ACTION: CREATE_ACTION_API_SUCCESS,
    ERROR_ACTION: CREATE_ACTION_API_FAIL
  });

export const deleteActiosApi = (id, cbSuccses) => {
  return makeRequest({
    method: "DELETE",
    //url: "https://jsonplaceholder.typicode.com/users/1",
    url: `${URL_API}/api_detail/${id}`,
    cbSuccess: cbSuccses,
    LOADING_ACTION: DELETE_ACTION_API_REQUEST,
    SUCCESS_ACTION: DELETE_ACTION_API_SUCCESS,
    ERROR_ACTION: DELETE_ACTION_API_FAIL
  });
};

export const updateActionApi = (values, cbSuccess) => {
  return makeRequest({
    method: "PUT",
    //url: `https://jsonplaceholder.typicode.com/users/${values.id}`,
    url: `${URL_API}/api_detail/${values.id}`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: UPDATE_ACTION_API_REQUEST,
    SUCCESS_ACTION: UPDATE_ACTION_API_SUCCESS,
    ERROR_ACTION: UPDATE_ACTION_API_FAIL
  });
};
