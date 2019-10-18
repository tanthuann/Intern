import CONSTANTS from "../constants/constants";

const {
  LOAD_USERS_ERROR,
  LOAD_USERS_LOADING,
  LOAD_USERS_SUCCESS
} = CONSTANTS.ACTIONS;

const initialState = {
  loading: false,
  error: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        // data: action.data,
        loading: false
      };
    }
    case LOAD_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
