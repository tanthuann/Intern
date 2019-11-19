// REQUEST FUNCTION
import { makeRequest } from "../api/request";

// URL
import { CONFIG_CONSTANTS } from "../config";

// CONSTANTS
import CONTANTS from "../constants/constants";

const { URL_API } = CONFIG_CONSTANTS;
const {
  FETCH_TABLE_FAIL,
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  CREATE_TABLE_FAIL,
  CREATE_TABLE_REQUEST,
  CREATE_TABLE_SUCCESS,
  DELETE_TABLE_FAIL,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  UPDATE_TABLE_FAIL,
  UPDATE_TABLE_REQUEST,
  UPDATE_TABLE_SUCCESS,
  FETCH_TYPES_TABLE_FAIL,
  FETCH_TYPES_TABLE_REQUEST,
  FETCH_TYPES_TABLE_SUCCESS,
  CREATE_TYPE_TABLE_FAIL,
  CREATE_TYPE_TABLE_REQUEST,
  CREATE_TYPE_TABLE_SUCCESS,
  DELETE_TYPE_TABLE_FAIL,
  DELETE_TYPE_TABLE_REQUEST,
  DELETE_TYPE_TABLE_SUCCESS,
  UPDATE_TYPE_TABLE_FAIL,
  UPDATE_TYPE_TABLE_REQUEST,
  UPDATE_TYPE_TABLE_SUCCESS,
} = CONTANTS.TABLEACTIONS;

/** ------------------------------ */
// REQUESTS TABLE
export const getTables = id =>
  makeRequest({
    url: `${URL_API}/tables`,
    params: {
      projectId: id,
      _embed: "table_detail"
    },
    LOADING_ACTION: FETCH_TABLE_REQUEST,
    SUCCESS_ACTION: FETCH_TABLE_SUCCESS,
    ERROR_ACTION: FETCH_TABLE_FAIL
  });

export const createTable = (values, cbSuccess) =>
  makeRequest({
    method: "POST",
    //url: "https://jsonplaceholder.typicode.com/users",
    url: `${URL_API}/tables`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: CREATE_TABLE_REQUEST,
    SUCCESS_ACTION: CREATE_TABLE_SUCCESS,
    ERROR_ACTION: CREATE_TABLE_FAIL
  });

export const deleteTable = (id, cbSuccses) => {
  return makeRequest({
    method: "DELETE",
    //url: "https://jsonplaceholder.typicode.com/users/1",
    url: `${URL_API}/tables/${id}`,
    cbSuccess: cbSuccses,
    LOADING_ACTION: DELETE_TABLE_REQUEST,
    SUCCESS_ACTION: DELETE_TABLE_SUCCESS,
    ERROR_ACTION: DELETE_TABLE_FAIL
  });
};

export const updateTable = (values, cbSuccess) => {
  return makeRequest({
    method: "PUT",
    //url: `https://jsonplaceholder.typicode.com/users/${values.id}`,
    url: `${URL_API}/tables/${values.id}`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: UPDATE_TABLE_REQUEST,
    SUCCESS_ACTION: UPDATE_TABLE_SUCCESS,
    ERROR_ACTION: UPDATE_TABLE_FAIL
  });
};

/** ------------------------------ */
// REQUESTS TYPE TABLE
export const getTypesTable = id =>
  makeRequest({
    url: `${URL_API}/table_detail`,
    params: {
      tableId: id
    },
    LOADING_ACTION: FETCH_TYPES_TABLE_REQUEST,
    SUCCESS_ACTION: FETCH_TYPES_TABLE_SUCCESS,
    ERROR_ACTION: FETCH_TYPES_TABLE_FAIL
  });

export const createTypeTable = (values, cbSuccess) =>
  makeRequest({
    method: "POST",
    //url: "https://jsonplaceholder.typicode.com/users",
    url: `${URL_API}/table_detail`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: CREATE_TYPE_TABLE_REQUEST,
    SUCCESS_ACTION: CREATE_TYPE_TABLE_SUCCESS,
    ERROR_ACTION: CREATE_TYPE_TABLE_FAIL
  });

export const deleteTypeTable = (id, cbSuccses) => {
  return makeRequest({
    method: "DELETE",
    //url: "https://jsonplaceholder.typicode.com/users/1",
    url: `${URL_API}/table_detail/${id}`,
    cbSuccess: cbSuccses,
    LOADING_ACTION: DELETE_TYPE_TABLE_REQUEST,
    SUCCESS_ACTION: DELETE_TYPE_TABLE_SUCCESS,
    ERROR_ACTION: DELETE_TYPE_TABLE_FAIL
  });
};

export const updateTypeTable = (values, cbSuccess) => {
  return makeRequest({
    method: "PUT",
    //url: `https://jsonplaceholder.typicode.com/users/${values.id}`,
    url: `${URL_API}/table_detail/${values.id}`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: UPDATE_TYPE_TABLE_REQUEST,
    SUCCESS_ACTION: UPDATE_TYPE_TABLE_SUCCESS,
    ERROR_ACTION: UPDATE_TYPE_TABLE_FAIL
  });
};
