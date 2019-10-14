import CONSTANTS from "../constants/constants";

const {
  AXIOS_UPDATE_USER,
  AXIOS_GET_USERS,
  AXIOS_DELETE_USER,
  AXIOS_POST_USER
} = CONSTANTS.ACTIONS;

const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AXIOS_GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case AXIOS_UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }
    case AXIOS_DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    case AXIOS_POST_USER:
      return {
        ...state,
        user: action.payload,
        users: state.users.concat(action.payload)
      };
    default:
      return state;
  }
}
