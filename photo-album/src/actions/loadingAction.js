import CONSTANTS from "../constants/constants";

const {
  LOAD_USERS_ERROR,
  LOAD_USERS_LOADING,
  LOAD_USERS_SUCCESS
} = CONSTANTS.ACTIONS;

export const startLoading = (dispatch) =>
  dispatch({
    type: LOAD_USERS_LOADING
  });

export const successLoading = dispatch =>
  dispatch({
    type: LOAD_USERS_SUCCESS
  });

export const errorLoading = (dispatch, err) =>
  dispatch({
    type: LOAD_USERS_ERROR,
    error: err,
    loading: false
  });
