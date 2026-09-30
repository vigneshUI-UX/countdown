import React, { useState, useEffect } from "react";
import "./CountdownLoader.css";

const CountdownLoader = ({ initialCount = 10, intervalMs = 1000 }) => {
  const [count, setCount] = useState(initialCount);
  const [isPaused, setIsPaused] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);

  useEffect(() => {
    let timer = null;

    if (!isPaused && !isNextPage) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            // Step 1: Flash blink effect
            setIsBlinking(true);

            // Step 2: Transition to COMING SOON view after blink (500ms)
            setTimeout(() => {
              setIsBlinking(false);
              setIsNextPage(true);
            }, 500);

            return 0;
          }
          return prevCount - 1;
        });
      }, intervalMs);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused, isNextPage, intervalMs]);

  const handlePauseToggle = () => {
    if (!isNextPage) {
      setIsPaused((prev) => !prev);
    }
  };

  const handleReset = () => {
    setCount(initialCount);
    setIsNextPage(false);
    setIsBlinking(false);
    setIsPaused(false);
  };

  // Radial Arc Math for Loader Ring
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = ((initialCount - count) / initialCount) * 100;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // 1. COMING SOON PAGE (Clean Dark Blue/Black View)
  if (isNextPage) {
    return (
      <div className="coming-soon-wrapper fade-in-view">
        <div className="coming-soon-content">
          <h1 className="title-cyan">COMING</h1>
          <h1 className="title-purple">SOON</h1>

          <p className="status-text">
            System synchronization complete. The next phase is initializing.
          </p>

          <button className="reinit-btn" onClick={handleReset}>
            <span className="btn-icon">↺</span>
            <span>RE-INITIALIZE SYSTEM</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. COUNTING PAGE (With Spinners & Orbit Animation)
  return (
    <div className={`cyber-card-wrapper ${isBlinking ? "card-blink" : ""}`}>
      {/* Outer Card Header */}
      <div className="card-header">
        <h1 className="main-title">LOADER COUNTDOWN</h1>
        <p className="sub-title">NEURAL TIMER SUBSYSTEM</p>
      </div>

      {/* Inner Screen Panel */}
      <div className="inner-panel">
        <div className="spinner-center-stage">
          {/* Layer 1: Outer Rotating Ring (Clockwise) */}
          <div className="orbit-container spin-cw-slow">
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle
                cx="110"
                cy="110"
                r="100"
                fill="none"
                stroke="url(#cyanArcGrad)"
                strokeWidth="2"
                strokeDasharray="140 100 50 80"
              />
              <defs>
                <linearGradient id="cyanArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2ff" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="orbit-dot dot-top-cyan" />
            <div className="orbit-dot dot-bottom-pink" />
          </div>

          {/* Layer 2: Middle Rotating Ring (Counter-Clockwise) */}
          <div className="orbit-container spin-ccw-medium">
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle
                cx="110"
                cy="110"
                r="86"
                fill="none"
                stroke="url(#purpleArcGrad)"
                strokeWidth="2.5"
                strokeDasharray="90 60 110 30"
              />
              <defs>
                <linearGradient id="purpleArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e879f9" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="orbit-dot dot-left-purple" />
          </div>

          {/* Layer 3: Main Progress Arc */}
          <svg className="radial-svg" width="200" height="200">
            <circle
              className="track-ring"
              cx="100"
              cy="100"
              r={radius}
              strokeWidth="6"
            />
            <circle
              className="progress-arc"
              cx="100"
              cy="100"
              r={radius}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Digital Counter Display */}
          <div className="center-display">
            <span className="digit-val">{count}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="controls-row">
          <button
            className={`action-btn ${isPaused ? "btn-paused" : ""}`}
            onClick={handlePauseToggle}
          >
            <span className="btn-icon">{isPaused ? "▶" : "❚❚"}</span>
            <span>{isPaused ? "RESUME" : "PAUSE"}</span>
          </button>

          <button className="action-btn" onClick={handleReset}>
            <span className="btn-icon">↺</span>
            <span>RESET</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownLoader;