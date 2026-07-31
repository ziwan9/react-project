import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Arcade from "./components/Arcade.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

export default function App() {
  const [section, setSection] = useState("home");

  return (
    <div className="app-shell">
      <Navbar active={section} onNavigate={setSection} />
      {section === "home" && <Hero onNavigate={setSection} />}
      {section === "about" && <About />}
      {section === "skills" && <Skills />}
      {section === "arcade" && <Arcade />}
      <Footer />
    </div>
  );
}
