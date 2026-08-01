import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="eyebrow">// ABOUT</div>
      <h2 className="about-title">Why this project</h2>
      <p className="about-text">
        This site was built as a school project to practice React fundamentals:
        components, state, side effects, and splitting an app into reusable pieces.
        Instead of three separate pages, every game lives in its own
        self-contained component and gets mounted inside a shared arcade
        layout.
      </p>
      <br></br>
      <p className="about-text">
        Each game manages its own state independently, so playing one doesn't
        affect the others, and switching tabs never resets your progress in
        the background.
      </p>

      <div className="contributors">
        <h3 className="contributors-title">Contributors</h3>
        <ul className="contributors-list">
          <li>Pradiip Roka</li>
          <li>Jiwan Hamal</li>
        </ul>
      </div>
    </section>
  );
}