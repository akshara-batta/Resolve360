import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/intro.css";

const quotes = [
  "Power shortage shouldn't mean solution shortage.",
  "Every complaint deserves a resolution.",
  "See the problem. Report it. Resolve it.",
  "Small issues become big problems when ignored.",
  "One report can start one big change."
];

const floatingProblems = [
  "💧 Water Leak",
  "💡 Power Cut",
  "🧹 Cleanliness",
  "🍽️ Food Issue",
  "🔧 Maintenance",
  "🛡️ Security"
];

function Intro() {
  const navigate = useNavigate();

  const [quote, setQuote] = useState(0);
  const [bulbOn, setBulbOn] = useState(false);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuote((old) => (old + 1) % quotes.length);
    }, 3200);

    const bulbTimer = setTimeout(() => {
      setBulbOn(true);
    }, 1200);

    return () => {
      clearInterval(quoteTimer);
      clearTimeout(bulbTimer);
    };
  }, []);

  function toggleBulb() {
    setBulbOn(false);

    setTimeout(() => {
      setBulbOn(true);
    }, 500);
  }

  return (
    <div className="intro-page">

      {/* Animated background */}

      <div className="bg-orb orb-one"></div>
      <div className="bg-orb orb-two"></div>
      <div className="bg-orb orb-three"></div>

      <div className="tech-grid"></div>

      <div className="scan-line"></div>

      <div className="stars">
        {Array.from({ length: 30 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      {/* Floating complaint cards */}

      <div className="floating-problems">
        {floatingProblems.map((problem, index) => (
          <div
            className={`problem-chip chip-${index + 1}`}
            key={problem}
          >
            {problem}
          </div>
        ))}
      </div>

      {/* Header */}

      <header className="intro-header">

        <div className="intro-brand">
          RESOLVE<span>360</span>
        </div>

        <div className="system-status">
          <span></span>
          SYSTEM ONLINE
        </div>

      </header>

      {/* Main */}

      <main className="intro-main">

        {/* LEFT */}

        <section className="intro-left">

          <div className="intro-tag">
            <span></span>
            SMART CAMPUS • SMART SOLUTIONS
          </div>

          <h1>
            Problems
            <br />

            <span>shouldn't stay</span>

            <br />

            <strong>unresolved.</strong>
          </h1>

          {/* Quote */}

          <div className="quote-container">

            <div className="quote-symbol">
              "
            </div>

            <p key={quote}>
              {quotes[quote]}
            </p>

            <div className="quote-progress">
              {quotes.map((_, index) => (
                <span
                  key={index}
                  className={
                    index === quote ? "active" : ""
                  }
                ></span>
              ))}
            </div>

          </div>

          <p className="intro-text">
            Resolve360 brings students, workers and authorities
            together on one intelligent platform to report,
            track and resolve everyday problems.
          </p>

          {/* Buttons */}

          <div className="intro-actions">

            <button
              className="start-button"
              onClick={() => navigate("/login")}
            >
              <span>Enter Resolve360</span>
              <b>→</b>
            </button>

            <button
              className="learn-button"
              onClick={() =>
                document
                  .getElementById("process")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              Explore the idea ↓
            </button>

          </div>

        </section>

        {/* RIGHT */}

        <section className="intro-right">

          <div className="power-label">
            ⚡ POWERING RESOLUTION
          </div>

          <div
            className={`energy-system ${
              bulbOn ? "energy-on" : ""
            }`}
            onClick={toggleBulb}
          >

            {/* Orbit rings */}

            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
            <div className="orbit orbit-3"></div>

            {/* Energy particles */}

            <div className="energy-particle p1">✦</div>
            <div className="energy-particle p2">+</div>
            <div className="energy-particle p3">✦</div>
            <div className="energy-particle p4">⚡</div>

            {/* Glow */}

            <div className="bulb-light"></div>

            {/* Bulb */}

            <div className="bulb-wrapper">

              <div className="bulb-glass">

                <div className="bulb-highlight"></div>

                <div className="filament">
                  <i></i>
                  <i></i>
                </div>

              </div>

              <div className="bulb-neck"></div>

              <div className="bulb-metal">

                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          </div>

          <div className="bulb-message">
            <b>CLICK TO IGNITE</b>
            <span>Every solution starts with an idea.</span>
          </div>

        </section>

      </main>

      {/* Bottom process */}

      <section
        className="process-section"
        id="process"
      >

        <div className="process-card">

          <div className="process-icon">
            📝
          </div>

          <div>
            <small>01</small>
            <strong>REPORT</strong>
            <p>Tell us what's wrong</p>
          </div>

        </div>

        <div className="process-arrow">
          →
        </div>

        <div className="process-card">

          <div className="process-icon">
            🔍
          </div>

          <div>
            <small>02</small>
            <strong>TRACK</strong>
            <p>Follow your complaint</p>
          </div>

        </div>

        <div className="process-arrow">
          →
        </div>

        <div className="process-card">

          <div className="process-icon">
            ⚡
          </div>

          <div>
            <small>03</small>
            <strong>RESOLVE</strong>
            <p>Get the problem solved</p>
          </div>

        </div>

      </section>

      <footer className="intro-footer">
        RESOLVE360 © 2026
      </footer>

    </div>
  );
}

export default Intro;