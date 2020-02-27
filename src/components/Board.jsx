import React from "react";
import { connect } from "react-redux";
import Square from "./Square";

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
    const squares = this.props.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.props.xIsNext ? "X" : "o";
    this.props.dispatch({ type: "PLAY_SPOT", id: i });
    this.props.dispatch({ type: "CHANGE_TURN" });
  }

  renderSquare(i) {
    return (
      <Square
        id={i}
        clickHandler={() => this.handleClick(i)}
        value={this.props.squares[i]}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(this.props.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.props.xIsNext ? "X" : "o"}`;
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

const mapStateToProps = state => {
  return {
    xIsNext: state.xIsNext,
    squares: state.squares
  };
};

export default connect(mapStateToProps)(Board);
