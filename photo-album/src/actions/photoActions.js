import axios from "axios";
import { CONFIG_CONSTANTS } from "../config";

import CONSTANTS from "../constants/constants";

import { startLoading, successLoading, errorLoading } from "./loadingAction";

const { GET_ALBUM } = CONSTANTS.ACTIONS;

export const getPhotoAlbum = (startPhoto = 0) => dispatch => {
  startLoading(dispatch);
  axios
    .get(
      `${CONFIG_CONSTANTS.API_URL_PHOTOS}/photos?_start=${startPhoto}&_limit=${CONSTANTS.LIMIT_PHOTOS}`
    )
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: GET_ALBUM,
        payload: data
      });
      successLoading(dispatch);
    })
    .catch(err => {
      errorLoading(dispatch, err);
      return err.response.data;
    });
};
