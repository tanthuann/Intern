import CONSTANTS from "../constants/constants";
import axios from "axios";

import { CONFIG_CONSTANTS } from "../config";

const { AXIOS_GET_ALBUM } = CONSTANTS.ACTIONS;

export const getPhotoAlbum = (startPhoto = 0) => dispatch => {
  console.log(startPhoto, CONSTANTS.LIMIT_PHOTOS);

  axios
    .get(
      `${CONFIG_CONSTANTS.API_URL}/photos?_start=${startPhoto}&_limit=${CONSTANTS.LIMIT_PHOTOS}`
    )
    .then(res => res.data)
    .then(data =>
      dispatch({
        type: AXIOS_GET_ALBUM,
        payload: data
      })
    )
    .catch(err => err.response.data);
};
