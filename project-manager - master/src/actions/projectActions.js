// REQUEST FUNCTION
import { makeRequest } from "../api/request";

// URL
import { CONFIG_CONSTANTS } from "../config";

// CONSTANTS
import CONTANTS from "../constants/constants";

const { URL_API } = CONFIG_CONSTANTS;
const {
  FETCH_PROJECT_FAIL,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} = CONTANTS.PROJECTACTIONS;

/*-----------------------------*/
// REQUESTS PROJECT
export const getProjects = () =>
  makeRequest({
    url: `${URL_API}/projects`,
    LOADING_ACTION: FETCH_PROJECT_REQUEST,
    SUCCESS_ACTION: FETCH_PROJECT_SUCCESS,
    ERROR_ACTION: FETCH_PROJECT_FAIL
  });

export const createProject = (values, cbSuccess) => {
  return makeRequest({
    method: "POST",
    //url: "https://jsonplaceholder.typicode.com/users",
    url: `${URL_API}/projects`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: CREATE_PROJECT_REQUEST,
    SUCCESS_ACTION: CREATE_PROJECT_SUCCESS,
    ERROR_ACTION: CREATE_PROJECT_FAIL
  });
}

export const deleteProject = (id, cbSuccses) => {
  return makeRequest({
    method: "DELETE",
    // url: "https://jsonplaceholder.typicode.com/users/1",
    cbSuccess: cbSuccses,
    url: `${URL_API}/projects/${id}`,
    LOADING_ACTION: DELETE_PROJECT_REQUEST,
    SUCCESS_ACTION: DELETE_PROJECT_SUCCESS,
    ERROR_ACTION: DELETE_PROJECT_FAIL
  });
}

export const updateProject = (values, cbSuccess) => {
  return makeRequest({
    method: "PUT",
    //url: `https://jsonplaceholder.typicode.com/users/${values.id}`,
    url: `${URL_API}/projects/${values.id}`,
    data: values,
    cbSuccess: cbSuccess,
    LOADING_ACTION: UPDATE_PROJECT_REQUEST,
    SUCCESS_ACTION: UPDATE_PROJECT_SUCCESS,
    ERROR_ACTION: UPDATE_PROJECT_FAIL
  });
}
