import CONTANTS from "../constants/constants";

const { ADD_TODO, TOGGLE_TODO } = CONTANTS.MODELS.TODO_MODELS;

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      console.log(action.id);
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo => {
        console.log(action.id);
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

    default:
      return state;
  }
}
