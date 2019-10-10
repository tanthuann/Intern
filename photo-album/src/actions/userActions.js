import CONSTANTS from "../constants/constants";
import axios from "axios";

import { CONFIG_CONSTANTS } from "../config";

const { AXIOS_DELETE_USER, AXIOS_GET_USERS } = CONSTANTS.ACTIONS;

export const getUsers = (startUser = 0) => dispatch => {
  console.log(startUser, CONSTANTS.LIMIT_USERS);
  axios
    .get(
      `${CONFIG_CONSTANTS.API_URL}/users?_start=${startUser}&_limit=${CONSTANTS.LIMIT_USERS}`
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

export const deleteUser = id => dispatch => {
  axios
    .delete(
      `${CONFIG_CONSTANTS.API_URL}/users/${id}`
    )
    .then(res => console.log(res.status, res.config.method))
    .then( () =>
      dispatch({
        type: AXIOS_DELETE_USER,
        id: id
      })
    )
    .catch(err => err.response.data);
};
