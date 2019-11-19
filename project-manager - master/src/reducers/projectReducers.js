import CONSTANTS from "../constants/constants";

const {
  FETCH_PROJECT_FAIL,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS
} = CONSTANTS.PROJECTACTIONS;
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: ""
      };
    case FETCH_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false,
        error: ""
      };
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loading: false,
        error: ""
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false,
        error: ""
      };
    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    default:
      return state;
  }
};
