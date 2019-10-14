import CONSTANTS from "../constants/constants";
import axios from "axios";

import { CONFIG_CONSTANTS } from "../config";

const {
  AXIOS_DELETE_USER,
  AXIOS_GET_USERS,
  AXIOS_POST_USER,
  AXIOS_UPDATE_USER
} = CONSTANTS.ACTIONS;

export const getUsers = (startUser = 0) => dispatch => {
  axios
    .get(
      `${CONFIG_CONSTANTS.API_URL_USERS}/users?_start=${startUser}&_limit=${CONSTANTS.LIMIT_USERS}`
      //"https://dcsfq.sse.codesandbox.io/users?_start=1&_limit=20"
    )
    .then(res => res.data)
    .then(data =>
      dispatch({
        type: AXIOS_GET_USERS,
        payload: data
      })
    )
    .catch(err => err.response.data);
};

export const createUser = (name, email, gender) => dispatch => {
  axios
    .post(`${CONFIG_CONSTANTS.API_URL_USERS}/users`, {
      name,
      email,
      gender
    })
    .then(res => res.data)
    .then(dataNewUser => {
      dispatch({
        type: AXIOS_POST_USER,
        payload: dataNewUser
      });
    })
    .catch(err => err.response.data);
};

export const updateUser = (id, name, email, gender) =>dispatch => {
  axios
    .put(`${CONFIG_CONSTANTS.API_URL_USERS}/users/${id}`, {
      name,
      email,
      gender
    })
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: AXIOS_UPDATE_USER,
        payload: { id, name, email, gender }
      });

      //dispatch({ type: AXIOS_GET_USERS, payload: data });

      // axios
      //   .get(
      //     `${CONFIG_CONSTANTS.API_URL_USERS}/users?_start=0&_limit=${CONSTANTS.LIMIT_USERS}`
      //     //"https://dcsfq.sse.codesandbox.io/users?_start=1&_limit=20"
      //   )
      //   .then(res => res.data)
      //   .then(data =>
      //     dispatch({
      //       type: AXIOS_GET_USERS,
      //       payload: data
      //     })
      //   )
      //   .catch(err => err.response.data);
    })
    .catch(err => err.response.data);
};

export const deleteUser = id => dispatch => {
  axios
    .delete(`${CONFIG_CONSTANTS.API_URL_USERS}/users/${id}`)
    .then(res => res.data)
    .then(() =>
      dispatch({
        type: AXIOS_DELETE_USER,
        id: id
      })
    )
    .catch(err => err.response.data);
};
