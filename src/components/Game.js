import React from "react";
import Board from "./Board";
import calculateWinner from "../functions/calculateWinner";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hystory: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(squareIndex) {
    const hystory = this.state.hystory;
    const current = hystory[this.state.stepNumber];
    console.log(this.state.stepNumber, "<<<<<");
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[squareIndex]) {
      return;
    }
    squares[squareIndex] = this.state.xIsNext ? "X" : "O";
    this.setState({
      hystory: hystory.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: hystory.length
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext : (step % 2) === 0,
    })
    console.log(this.state.stepNumber, "<<<<<");
  }

  render() {
    const hystory = this.state.hystory;
    const current = hystory[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = hystory.map((turn, index) => {
      const desc = index ? "go to move #" + index : "go to game start";

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
