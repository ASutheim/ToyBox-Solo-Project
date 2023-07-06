const toyReducer = (state = {}, action) => {
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
  