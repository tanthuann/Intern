import CONSTANTS from "../constants/constants";
import axios from "axios";
import { errorLoading, startLoading, successLoading } from "./loadingAction";

import { makeRequest } from "../api/request";
import { CONFIG_CONSTANTS } from "../config";

const {
  DELETE_USER,
  GET_USERS,
  POST_USER,
  UPDATE_USER,
  LOAD_USERS_LOADING,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR
} = CONSTANTS.ACTIONS;

export const getUsers = (startUser = 0) =>
  makeRequest({
    url: `${CONFIG_CONSTANTS.API_URL_USERS}/users?_start=${startUser}&_limit=${CONSTANTS.LIMIT_USERS}`,
    LOADING_ACTION: LOAD_USERS_LOADING,
    SUCCESS_ACTION: LOAD_USERS_SUCCESS,
    ERROR_ACTION: LOAD_USERS_ERROR
  });
// dispatch => {
//   startLoading(dispatch);
//   //dispatch({type: LOAD_USERS_LOADING})
//   axios
//     .get(
//       `${CONFIG_CONSTANTS.API_URL_USERS}/users?_start=${startUser}&_limit=${CONSTANTS.LIMIT_USERS}`
//       //"https://dcsfq.sse.codesandbox.io/users?_start=1&_limit=20"
//     )
//     .then(res => res.data)
//     .then(data => {
//       dispatch({
//         type: GET_USERS,
//         payload: data
//       });
//       successLoading(dispatch);
//     })
//     .catch(err => {
//       errorLoading(dispatch, err);
//       return err.response.data;
//     });

export const createUser = (
  name,
  email,
  gender,
  callback = null
) => dispatch => {
  startLoading(dispatch);
  axios
    .post(`${CONFIG_CONSTANTS.API_URL_USERS}/users`, {
      name,
      email,
      gender
    })
    .then(res => res.data)
    .then(dataNewUser => {
      dispatch({
        type: POST_USER,
        payload: dataNewUser
      });
      successLoading(dispatch);
      // trigger callback
      if (callback) callback();
    })
    .catch(err => {
      errorLoading(dispatch, err);
      return err.response.data;
    });
};

export const updateUser = (id, name, email, gender, callback) => dispatch => {
  startLoading(dispatch);
  axios
    .put(`${CONFIG_CONSTANTS.API_URL_USERS}/users/${id}`, {
      name,
      email,
      gender
    })
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: UPDATE_USER,
        payload: { id, name, email, gender }
      });

      // trigger callback
      successLoading(dispatch);
      if (callback) callback();
    })
    .catch(err => {
      errorLoading(dispatch, err);
      return err.response.data;
    });
};

export const deleteUser = id => dispatch => {
  startLoading(dispatch);
  axios
    .delete(`${CONFIG_CONSTANTS.API_URL_USERS}/users/${id}`)
    .then(res => res.data)
    .then(() => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
      axios
        .get(
          `${CONFIG_CONSTANTS.API_URL_USERS}/users?_start=0&_limit=${CONSTANTS.LIMIT_USERS}`
          //"https://dcsfq.sse.codesandbox.io/users?_start=1&_limit=20"
        )
        .then(res => res.data)
        .then(data => {
          dispatch({
            type: GET_USERS,
            payload: data
          });
          successLoading(dispatch);
        })
        .catch(err => err.response.data);
    })
    .catch(err => {
      errorLoading(dispatch, err);
      return err.response.data;
    });
};
