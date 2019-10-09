import CONSTANTS from '../constants/constants';
import axios from 'axios';

const { AXIOS_GET_USERS, AXIOS_GET_ALBUM } = CONSTANTS.ACTIONS


export const getPhotoAlbum = (startPhoto = 0) => dispatch => {
    console.log(startPhoto,CONSTANTS.LIMIT_PHOTOS)
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_start=${startPhoto}&_limit=${CONSTANTS.LIMIT_PHOTOS}`
      )
      .then(res => res.data)
      .then(data => dispatch({
          type: AXIOS_GET_ALBUM,
          payload: data 
      }));
}

export const getUsers = (startUser = 0) => dispatch => {
    console.log(startUser,CONSTANTS.LIMIT_USERS)
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_start=${startUser}&_limit=${CONSTANTS.LIMIT_USERS}`
      )
      .then(res => res.data)
      .then(data => dispatch({
          type: AXIOS_GET_USERS,
          payload: data 
      }));
}