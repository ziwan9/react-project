import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Arcade from "./components/Arcade.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

export default function App() {
  const [section, setSection] = useState("home");

  return (
    <div className="app-shell">
      <Navbar active={section} onNavigate={setSection} />
      <main className="app-main">
        {section === "home" && <Hero onNavigate={setSection} />}
        {section === "about" && <About />}
        {section === "arcade" && <Arcade />}
      </main>
      <Footer />
    </div>
  );
}
