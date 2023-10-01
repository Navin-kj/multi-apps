import React, { useState } from "react";
import { useSelector } from "react-redux";

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const { theme } = useSelector((s) => s.theme);

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((square) => square)) {
      return "Draw!";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  };

  return (
    <div
      className={`${theme === "dark" ? "dark-theme TickTacToe" : "TickTacToe"}`}
    >
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div className="board-row" key={row}>
              {Array(3)
                .fill(null)
                .map((_, col) => renderSquare(3 * row + col))}
            </div>
          ))}
      </div>
      <div className="status">{getStatus()}</div>
      <button className="reset-button" onClick={resetBoard}>
        Reset Board
      </button>
    </div>
  );
};

export default Tictactoe;

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
