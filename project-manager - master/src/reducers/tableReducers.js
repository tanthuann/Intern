import CONSTANTS from "../constants/constants";

const {
  FETCH_TABLE_FAIL,
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  CREATE_TABLE_FAIL,
  CREATE_TABLE_SUCCESS,
  CREATE_TABLE_REQUEST,
  DELETE_TABLE_FAIL,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  UPDATE_TABLE_FAIL,
  UPDATE_TABLE_REQUEST,
  UPDATE_TABLE_SUCCESS,
  FETCH_TYPES_TABLE_FAIL,
  FETCH_TYPES_TABLE_REQUEST,
  FETCH_TYPES_TABLE_SUCCESS,
  CREATE_TYPE_TABLE_FAIL,
  CREATE_TYPE_TABLE_SUCCESS,
  CREATE_TYPE_TABLE_REQUEST,
  DELETE_TYPE_TABLE_FAIL,
  DELETE_TYPE_TABLE_REQUEST,
  DELETE_TYPE_TABLE_SUCCESS,
  UPDATE_TYPE_TABLE_FAIL,
  UPDATE_TYPE_TABLE_REQUEST,
  UPDATE_TYPE_TABLE_SUCCESS
} = CONSTANTS.TABLEACTIONS;
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TABLE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case FETCH_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case CREATE_TABLE_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case CREATE_TABLE_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case CREATE_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    case DELETE_TABLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_TABLE_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loading: false
      };
    case DELETE_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_TABLE_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case UPDATE_TABLE_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case UPDATE_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    //TYPES TABLE
    case FETCH_TYPES_TABLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TYPES_TABLE_SUCCESS:
      return {
        ...state,
        dataTypes: action.payload,
        loading: false
      };
    case FETCH_TYPES_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case CREATE_TYPE_TABLE_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case CREATE_TYPE_TABLE_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case CREATE_TYPE_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    case DELETE_TYPE_TABLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_TYPE_TABLE_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loading: false
      };
    case DELETE_TYPE_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_TYPE_TABLE_REQUEST:
      return {
        ...state,
        loadingButton: true
      };
    case UPDATE_TYPE_TABLE_SUCCESS:
      return {
        ...state,
        body: action.payload,
        loadingButton: false
      };
    case UPDATE_TYPE_TABLE_FAIL:
      return {
        ...state,
        error: action.error,
        loadingButton: false
      };
    default:
      return state;
  }
};
