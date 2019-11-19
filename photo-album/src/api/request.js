import axios from "axios";

const isRequire = variable => {
  throw new Error(`Missing param: ${variable}`);
};

export const makeRequest = ({
  url = isRequire("url"),
  data = null,
  params = null,
  method = "GET",
  cbSuccess = null,
  cbFail = null,
  LOADING_ACTION,
  SUCCESS_ACTION,
  ERROR_ACTION
}) => dispatch => {
  dispatch({ type: LOADING_ACTION }); // LOADING = true
  //dispatch({type: LOAD_USERS_LOADING})
  axios({
    url,
    data,
    params,
    method
  })
    .then(res => res.data)
    .then(data => {
      dispatch({ type: SUCCESS_ACTION, payload: data }); // LOADING = FALSE
      if (cbSuccess) cbSuccess();
    })
    .catch(err => {
      dispatch({ type: ERROR_ACTION }); // LOADING = FALSE
      if (cbFail) cbFail();
      return err.response.data;
    });
};
