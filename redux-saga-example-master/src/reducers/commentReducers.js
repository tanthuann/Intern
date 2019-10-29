import CONTANTS from "../contants/contants";

const {
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
  API_CALL_REQUEST,
  API_LOAD_MORE,
  API_LOAD_MORE_SUCCESS,
  API_LOAD_MORE_FAILURE,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT,
  DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS
} = CONTANTS.ACTIONS;

// reducer with initial state
const initialState = {
  loading: false,
  comments: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, loading: true, error: null };
    case API_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        amountComment: action.limit,
        pageMore: 2
      };
    case API_CALL_FAILURE:
      return { ...state, loading: false, dog: null, error: action.error };

    case API_LOAD_MORE:
      return { ...state, loadingButton: true, error: null };
    case API_LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadingButton: false,
        comments: [...state.comments, ...action.payload],
        pageMore: state.pageMore + 1
      };
    case API_LOAD_MORE_FAILURE:
      return { ...state, loadingButton: false, error: action.error };

    case POST_COMMENT:
      return { ...state, loadingButton: true, comment: action.payload };
    case POST_COMMENT_SUCCESS:
      return { ...state, loadingButton: false, comment: [] };
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        loadingButton: false,
        comment: [],
        error: action.error
      };

    case DELETE_COMMENT:
      return { ...state, loading: true, id: action.payload };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, loading: false };
    case DELETE_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.error };

    case UPDATE_COMMENT:
      return { ...state, loadingButton: true, comment: action.payload };
    case UPDATE_COMMENT_SUCCESS:
      return { ...state, loadingButton: false };
    case UPDATE_COMMENT_FAILURE:
      return { ...state, loadingButton: false, error: action.error };
    default:
      return state;
  }
}
