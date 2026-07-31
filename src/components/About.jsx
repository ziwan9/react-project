import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="eyebrow">// ABOUT</div>
      <h2 className="about-title">Why this project</h2>
      <p className="about-text">
        This site was built as a school project to practice React fundamentals:
        components, state (<code>useState</code>), side effects (
        <code>useEffect</code>), and splitting an app into reusable pieces.
        Instead of three separate pages, every game lives in its own
        self-contained component and gets mounted inside a shared arcade
        layout — the same idea a portfolio site uses for an "About" or
        "Skills" section.
      </p>
      <p className="about-text">
        Each game manages its own state independently, so playing one doesn't
        affect the others, and switching tabs never resets your progress in
        the background.
      </p>
    </section>
  );
}
