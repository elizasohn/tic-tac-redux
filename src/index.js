import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

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

const store = createStore(reducer);

function Square(props) {
  return (
    <button className="square" onClick={props.clickHandler}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const squares = store.getState().squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = store.getState().xIsNext ? "X" : "o";
    store.dispatch({ type: "PLAY_SPOT", id: i });
    store.dispatch({ type: "CHANGE_TURN" });
  }

  renderSquare(i) {
    return (
      <Square
        id={i}
        clickHandler={() => this.handleClick(i)}
        value={store.getState().squares[i]}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(store.getState().squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${store.getState().xIsNext ? "X" : "o"}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

connect()(App);

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
