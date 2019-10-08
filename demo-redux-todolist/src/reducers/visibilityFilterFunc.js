import CONSTANTS from "../constants/constants";

const { SET_VISIBILITY_FILTER } = CONSTANTS.MODELS.FILTER_MODELS;

const { SHOW_ALL } = CONSTANTS.VISIBILITY_FILTER;

export default function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
