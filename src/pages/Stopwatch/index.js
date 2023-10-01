import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Stopwatch = () => {
  const [timeElapsed, setTimeElapsed] = useState(0); // Initial time in milliseconds
  const [isActive, setIsActive] = useState(false);
  const { theme } = useSelector((s) => s.theme);
  useEffect(() => {
    let stopwatchInterval;

    if (isActive) {
      stopwatchInterval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    } else {
      clearInterval(stopwatchInterval);
    }

    return () => clearInterval(stopwatchInterval);
  }, [isActive]);

  const toggleStopwatch = () => {
    setIsActive(!isActive);
  };

  const resetStopwatch = () => {
    setIsActive(false);
    setTimeElapsed(0);
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMilliseconds = milliseconds % 1000;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${remainingMilliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <div
      className={`${theme === "dark" ? "dark-theme stopwatch" : "stopwatch"}`}
    >
      <h1>Stopwatch</h1>
      <div className="timer">{formatTime(timeElapsed)}</div>
      <div className="buttons">
        <button onClick={toggleStopwatch} className="stopwatch-btn">
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="stopwatch-btn" onClick={resetStopwatch}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
