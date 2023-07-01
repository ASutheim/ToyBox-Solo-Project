const toyReducer = (state = {}, action) => {
    switch (action.type) {
      case "SET_TOY":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default toyReducer;
  