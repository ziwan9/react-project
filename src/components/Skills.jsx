import React from "react";
import "./Skills.css";

const SKILLS = [
  { name: "React Components", level: 92 },
  { name: "State Management", level: 88 },
  { name: "Game Logic", level: 85 },
  { name: "Conditional Rendering", level: 90 },
  { name: "Event Handling", level: 87 },
  { name: "CSS-in-JS Styling", level: 80 },
];

export default function Skills() {
  return (
    <section className="skills">
      <div className="eyebrow">// SKILLS</div>
      <h2 className="skills-title">What this build used</h2>
      <div className="skills-list">
        {SKILLS.map((s) => (
          <div key={s.name} className="skill-row">
            <div className="skill-row-label">
              <span>{s.name}</span>
              <span className="skill-row-level">{s.level}%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
