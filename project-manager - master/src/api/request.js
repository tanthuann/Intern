// LIBRARY
import axios from "axios";

const isRequire = variable => {
  throw new Error(`Missing params ${variable}`);
};

export const makeRequest = ({
  url = isRequire("url"),
  data = null,
  method = "GET",
  params = null,
  cbSuccess = null,
  cbFail = null,
  LOADING_ACTION,
  SUCCESS_ACTION,
  ERROR_ACTION
}) => dispatch => {
  dispatch({ type: LOADING_ACTION, payload: data });
  axios({
    url,
    data,
    params,
    method
  })
    .then(res => res.data)
    .then(data => {
      dispatch({ type: SUCCESS_ACTION, payload: data });
      if (cbSuccess) cbSuccess();
    })
    .catch(err => {
      dispatch({ type: ERROR_ACTION, error: err.message });
      if (cbFail) cbFail();
      return;
    });
};
