import CONSTANTS from "../constants/constants";

const { UPDATE_USER, GET_USERS, DELETE_USER, POST_USER } = CONSTANTS.ACTIONS;

const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case UPDATE_USER_LOADING:
      return {
        ...state,
        isLoading: true,
        user: action.payload
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: true,
        user: action.payload
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: true,        
        user: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case POST_USER:
      return {
        ...state,
        user: action.payload,
        users: state.users.concat(action.payload)
      };
    default:
      return state;
  }
}
