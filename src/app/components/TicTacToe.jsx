"use client";
import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board) => {
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isTie = board.every((square) => square) && !winner;

  const renderSquare = (index) => (
    <button
      onClick={() => handleClick(index)}
      className={`w-16 h-16 border-2 flex items-center justify-center text-2xl font-bold ${
        board[index] === "X"
          ? "text-red-500"
          : board[index] === "O"
          ? "text-blue-500"
          : ""
      }`}
    >
      {board[index]}
    </button>
  );

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <div>
        <div className="flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="mt-4">
        {winner
          ? `Winner: ${winner}`
          : isTie
          ? "Tie Game!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      {(winner || isTie) && (
        <button
          onClick={handlePlayAgain}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
