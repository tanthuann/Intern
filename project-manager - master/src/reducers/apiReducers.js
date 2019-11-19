import CONSTANTS from "../constants/constants";

const {
  FETCH_API_FAIL,
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  CREATE_API_FAIL,
  CREATE_API_SUCCESS,
  CREATE_API_REQUEST,
  DELETE_API_FAIL,
  DELETE_API_REQUEST,
  DELETE_API_SUCCESS,
  UPDATE_API_FAIL,
  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  FETCH_ACTIONS_API_FAIL,
  FETCH_ACTIONS_API_REQUEST,
  FETCH_ACTIONS_API_SUCCESS,
  CREATE_ACTION_API_FAIL,
  CREATE_ACTION_API_REQUEST,
  CREATE_ACTION_API_SUCCESS,
  UPDATE_ACTION_API_FAIL,
  UPDATE_ACTION_API_REQUEST,
  UPDATE_ACTION_API_SUCCESS,
  DELETE_ACTION_API_FAIL,
  DELETE_ACTION_API_REQUEST,
  DELETE_ACTION_API_SUCCESS,
} = CONSTANTS.APIACTIONS;
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    //APIS
    case FETCH_API_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case FETCH_API_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case CREATE_API_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case CREATE_API_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case CREATE_API_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    case DELETE_API_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_API_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loading: false
      };
    case DELETE_API_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_API_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case UPDATE_API_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case UPDATE_API_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    /* ---------------------------------- */
    //ACTIONS API
    case FETCH_ACTIONS_API_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ACTIONS_API_SUCCESS:
      return {
        ...state,
        dataActions: action.payload,
        loading: false
      };
    case FETCH_ACTIONS_API_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
      case CREATE_ACTION_API_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case CREATE_ACTION_API_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case CREATE_ACTION_API_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    case DELETE_ACTION_API_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_ACTION_API_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loading: false
      };
    case DELETE_ACTION_API_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_ACTION_API_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case UPDATE_ACTION_API_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case UPDATE_ACTION_API_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    default:
      return state;
  }
};
