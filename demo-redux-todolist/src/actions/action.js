import CONSTANTS from "../constants/constants";

const { ADD_TODO, TOGGLE_TODO } = CONSTANTS.MODELS.TODO_MODELS;
const { SET_VISIBILITY_FILTER } = CONSTANTS.MODELS.FILTER_MODELS;

//ACTION CREATORS
let nextID = 0;
export const addTodo = text => dispatch => {
  return dispatch({
    id: nextID++,
    type: ADD_TODO,
    text
  });
};

export const toggleTodo = id => dispatch => {
  return dispatch({
    type: TOGGLE_TODO,
    id
  });
};

export const setVisibilityFilter = filter => dispatch => {
  return dispatch({
    type: SET_VISIBILITY_FILTER,
    filter
  });
};
