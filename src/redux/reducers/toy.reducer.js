const toyReducer = (state = {}, action) => {
  console.log("Inside toy reducer:", action.payload);
  switch (action.type) {
    case "SET_TOY":
      return action.payload;
    case "RESET_TOY":
      return {};
    default:
      return state;
  }
};

export default toyReducer;
