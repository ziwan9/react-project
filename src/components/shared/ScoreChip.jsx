import React from "react";
import "./shared.css";

export default function ScoreChip({ label, value, accent }) {
  return (
    <div className={`score-chip ${accent ? "score-chip--accent" : ""}`}>
      <div className="score-chip-label">{label}</div>
      <div className="score-chip-value">{value}</div>
    </div>
  );
}
