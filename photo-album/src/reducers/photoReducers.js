import CONSTANTS from "../constants/constants";

const { GET_ALBUM } = CONSTANTS.ACTIONS;

const initialState = {
  photos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUM:
      return {
        ...state,
        photos: action.payload
      };
    default:
      return state;
  }
}
