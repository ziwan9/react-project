import React from "react";
import "./shared.css";

export default function GameHeader({ title, subtitle }) {
  return (
    <div className="game-header">
      <h3 className="game-header-title">{title}</h3>
      <p className="game-header-subtitle">{subtitle}</p>
    </div>
  );
}
