import React, { useState } from "react";
import NumberGuessGame from "../games/NumberGuessGame.jsx";
import TicTacToe from "../games/TicTacToe.jsx";
import ChessGame from "../games/ChessGame.jsx";
import "./Arcade.css";

const TABS = [
  { id: "guess", label: "01 · Number Guess" },
  { id: "ttt", label: "02 · Tic-Tac-Toe" },
  { id: "chess", label: "03 · Chess" },
];

export default function Arcade() {
  const [game, setGame] = useState("guess");

  return (
    <section className="arcade">
      <div className="eyebrow">// GAMES</div>
      <h2 className="arcade-title">Pick a cabinet</h2>

      <div className="arcade-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setGame(t.id)}
            className={`arcade-tab ${game === t.id ? "arcade-tab--active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="arcade-panel">
        {game === "guess" && <NumberGuessGame />}
        {game === "ttt" && <TicTacToe />}
        {game === "chess" && <ChessGame />}
      </div>
    </section>
  );
}
