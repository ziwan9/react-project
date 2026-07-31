import React, { useState } from "react";
import GameHeader from "../components/shared/GameHeader.jsx";
import ScoreChip from "../components/shared/ScoreChip.jsx";
import "../components/shared/shared.css";
import "./NumberGuessGame.css";

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function NumberGuessGame() {
  const [target, setTarget] = useState(generateRandomNumber);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("playing"); // playing | won
  const [bestScore, setBestScore] = useState(null);

  const resetGame = () => {
    setTarget(generateRandomNumber());
    setGuess("");
    setAttempts(0);
    setHistory([]);
    setStatus("playing");
  };

  const submitGuess = (e) => {
    e.preventDefault();
    if (status !== "playing") return;
    const num = Number(guess);
    if (!Number.isInteger(num) || num < 1 || num > 100) {
      setHistory((h) => [{ guess, result: "Enter a whole number 1-100" }, ...h]);
      return;
    }
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === target) {
      setStatus("won");
      setHistory((h) => [{ guess: num, result: "Correct!" }, ...h]);
      setBestScore((b) => (b === null || newAttempts < b ? newAttempts : b));
    } else if (num < target) {
      setHistory((h) => [{ guess: num, result: "Your guess is less than the number ↑" }, ...h]);
    } else {
      setHistory((h) => [{ guess: num, result: "Your guess is greater than the number ↓" }, ...h]);
    }
    setGuess("");
  };

  return (
    <div>
      <GameHeader title="Number Guess" subtitle="Pick a whole number between 1 and 100." />

      <div className="score-row">
        <ScoreChip label="Attempts" value={attempts} />
        <ScoreChip label="Best" value={bestScore === null ? "—" : bestScore} />
        <ScoreChip label="Status" value={status === "won" ? "Solved" : "In progress"} accent={status === "won"} />
      </div>

      {status === "playing" ? (
        <form onSubmit={submitGuess} className="guess-form">
          <input
            type="number"
            min={1}
            max={100}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your guess..."
            autoFocus
            className="guess-input"
          />
          <button type="submit" className="btn-primary">
            GUESS
          </button>
        </form>
      ) : (
        <div className="guess-won-banner">
          <div className="guess-won-text">
            🎉 You got it — the number was <strong>{target}</strong>. It took you{" "}
            <strong>{attempts}</strong> {attempts === 1 ? "try" : "tries"}.
          </div>
          <button onClick={resetGame} className="btn-primary">
            PLAY AGAIN
          </button>
        </div>
      )}

      {status === "playing" && (
        <button onClick={resetGame} className="guess-restart-link">
          Restart with a new number
        </button>
      )}

      {history.length > 0 && (
        <div>
          <div className="guess-history-label">HISTORY</div>
          <div className="guess-history-list">
            {history.map((h, i) => (
              <div
                key={i}
                className={`guess-history-row ${h.result === "Correct!" ? "guess-history-row--win" : ""}`}
              >
                <span>Guess: {h.guess}</span>
                <span>{h.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
