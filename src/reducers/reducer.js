const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true
};

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "PLAY_SPOT":
      const newSquares = [...state.squares];
      newSquares[action.id] = state.xIsNext ? "X" : "o";
      newState = Object.assign({}, state, { squares: newSquares });
      console.log(action);

      return newState;
    case "CHANGE_TURN":
      newState = Object.assign({}, state, { xIsNext: !state.xIsNext });
      return newState;
    default:
      return state;
  }
};

export default reducer;
