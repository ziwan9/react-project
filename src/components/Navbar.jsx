import React from "react";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "arcade", label: "Games" },
];

export default function Navbar({ active, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">&lt; WELCOME-PLAYER &gt;</div>
      <div className="navbar-links">
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => onNavigate(l.id)}
            className={`navbar-link ${active === l.id ? "navbar-link--active" : ""}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
