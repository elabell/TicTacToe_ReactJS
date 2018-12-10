import React, { Component } from "react";
import "./AppPlay.css";

class AppPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNextMove: true,
      winner: null,
      lastMove: null,
      squares: Array(9).fill(null),

      scoreGamer1: 0,
      scoreGamer2: 0
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNextMove ? "X" : "O";
    const winner = this.calculateWinner(squares);
    this.setState({
      squares: squares,
      xIsNextMove: !this.state.xIsNextMove,
      winner: winner,
      scoreGamer1:
        this.state.xIsNextMove && winner
          ? this.state.scoreGamer1 + 1
          : this.state.scoreGamer1,

      scoreGamer2:
        !this.state.xIsNextMove && winner
          ? this.state.scoreGamer2 + 1
          : this.state.scoreGamer2,
      lastMove: i
    });
  }

  resetBoard = () => {
    this.setState({
      squares: Array(9).fill(null), //InitialBoard,
      xIsNextMove: true,
      winner: null
    });
  };

  cancelMove = () => {
    //redo
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares)) {
      return;
    }

    if (squares[this.state.lastMove] != null) {
      squares[this.state.lastMove] = null;
      this.setState({
        squares: squares,
        xIsNextMove: !this.state.xIsNextMove,
        lastMove: null
      });
    }
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNextMove ? "X" : "O");
    }

    return (
      <div className="Board">
        <div className="Title">
          <h1>Tic Tac TOE </h1>
          <p>The Example of React Javascript Native Game</p>
        </div>

        <Score
          scoreGamer1={this.state.scoreGamer1}
          scoreGamer2={this.state.scoreGamer2}
        />
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
        <GameButtons onReset={this.resetBoard} onCancel={this.cancelMove} />
      </div>
    );
  }

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
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value ? props.value : <span>&nbsp;</span>}
    </button>
  );
}

const Score = props => (
  <div className="score">
    <div>Score 1 th Player : {props.scoreGamer1}</div>
    <div>Score 2nd Player : {props.scoreGamer2}</div>
  </div>
);

const GameButtons = props => (
  <div className="button">
    <button className="button" onClick={props.onReset}>
      Clear Board
    </button>
    <button className="button" onClick={props.onCancel}>
      Cancel Last Move
    </button>
  </div>
);
export default AppPlay;
