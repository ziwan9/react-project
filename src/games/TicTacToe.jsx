import React, { useState, useEffect } from "react";
import GameHeader from "../components/shared/GameHeader.jsx";
import ScoreChip from "../components/shared/ScoreChip.jsx";
import "../components/shared/shared.css";
import "./TicTacToe.css";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const winInfo = calculateWinner(squares);
  const isDraw = !winInfo && squares.every((s) => s !== null);

  useEffect(() => {
    if (winInfo) {
      setScores((s) => ({ ...s, [winInfo.winner]: s[winInfo.winner] + 1 }));
    } else if (isDraw) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winInfo?.winner, isDraw]);

  const handleClick = (i) => {
    if (squares[i] || winInfo) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const resetAll = () => {
    resetBoard();
    setScores({ X: 0, O: 0, draws: 0 });
  };

  let statusText;
  if (winInfo) statusText = `Player ${winInfo.winner} wins!`;
  else if (isDraw) statusText = "It's a draw.";
  else statusText = `Player ${xIsNext ? "X" : "O"}'s turn`;

  return (
    <div>
      <GameHeader title="Tic-Tac-Toe" subtitle="Classic 3x3. Get three in a row." />

      <div className="score-row">
        <ScoreChip label="X wins" value={scores.X} />
        <ScoreChip label="O wins" value={scores.O} />
        <ScoreChip label="Draws" value={scores.draws} />
      </div>

      <div className={`ttt-status ${winInfo ? "ttt-status--win" : ""}`}>{statusText}</div>

      <div className="ttt-board">
        {squares.map((val, i) => {
          const isWinning = winInfo?.line.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`ttt-square ${isWinning ? "ttt-square--win" : ""} ${
                val === "X" ? "ttt-square--x" : val === "O" ? "ttt-square--o" : ""
              }`}
            >
              {val}
            </button>
          );
        })}
      </div>

      <div className="ttt-actions">
        <button onClick={resetBoard} className="btn-primary">
          NEW ROUND
        </button>
        <button onClick={resetAll} className="btn-ghost">
          Reset score
        </button>
      </div>
    </div>
  );
}
