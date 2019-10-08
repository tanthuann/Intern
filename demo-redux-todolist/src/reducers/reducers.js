import { combineReducers } from "redux";

import todos from "./todosFunc";
import visibilityFilter from "./visibilityFilterFunc";

// const initialState = {
//   visibilityFilter: SHOW_ALL,
//   todos: []
// };

// function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   };
// }

export default combineReducers({
  visibilityFilter,
  todos
});
