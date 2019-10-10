import CONSTANTS from "../constants/constants";

const {
  AXIOS_GET_ALBUM,
  AXIOS_GET_USERS,
  AXIOS_DELETE_USER
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
    case AXIOS_DELETE_USER:
      console.log(action.id);
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };

    default:
      return state;
  }
}
