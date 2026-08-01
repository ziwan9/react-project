import React from "react";
import "./Hero.css";

const CARDS = [
  { n: "01", t: "Number Guess", d: "Guess 1–100 in the fewest tries." },
  { n: "02", t: "Tic-Tac-Toe", d: "Classic 3x3, two players." },
  { n: "03", t: "Chess", d: "Full 8x8 board, click to move." },
];

export default function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-eyebrow">// REACT PROJECT //</div>
      <h1 className="hero-title">
        <span className="hero-title-accent">Pick a Game.</span>
      </h1>
      <p className="hero-subtitle">
        A tri-ame built from scratch in React — a number-guessing game,
        tic-tac-toe, and a playable chess board, each wired up as its own
        component.
      </p>
      <button className="hero-cta" onClick={() => onNavigate("arcade")}>
        ▶ CLICK TO PLAY
      </button>

      <div className="hero-grid">
        {CARDS.map((c) => (
          <div key={c.n} className="hero-card" onClick={() => onNavigate("arcade")}>
            <div className="hero-card-num">{c.n}</div>
            <div className="hero-card-title">{c.t}</div>
            <div className="hero-card-desc">{c.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
