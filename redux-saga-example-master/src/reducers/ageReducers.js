const initialState = {
  age: 20
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "AGE_UP_ASYNC":
      newState.age += action.value;
      break;

    case "AGE_DOWN_ASYNC":
      newState.age -= action.value;
      break;
    default:
      return state;
  }
  return newState;
};
