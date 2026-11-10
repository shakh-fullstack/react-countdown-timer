import { useState } from "react";
import "../App.css";

const CountDownTimer = () => {
  const [second, setSecond] = useState(300);
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [id, setId] = useState(null);

  const toggleTimer = () => {
    if (isStartTimer) {
      clearInterval(id);
      setIsStartTimer(false);
    } else {
      const intervalId = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond <= 1) {
            clearInterval(intervalId);
            setIsStartTimer(false);
            return 0;
          }
          return prevSecond - 1;
        });
      }, 1000);
      setId(intervalId);
      setIsStartTimer(true);
    }
  };
  const stopTimer = () => {
    clearInterval(id);
    setIsStartTimer(false);
    setSecond(300);
  };

  const addTime = (addSecond) => {
    setSecond((prev) => prev + addSecond);
  };

  const minute = Math.floor(second / 60);
  const remainingSeconds = second % 60;

  return (
    <div className="timer-wrapper">
      <div className="timer-card">
        <div className="timer-body">
          <div className="timer-display">
            {String(minute).padStart(2, "0")}:
            {String(remainingSeconds).padStart(2, "0")}
          </div>

          <div className="timer-presets">
            {/* 7. QO'SHILDI: Preset tugmalarga addTime funksiyasi ulandi */}
            <button className="preset-btn" onClick={() => addTime(30)}>
              +0:30
            </button>
            <button className="preset-btn" onClick={() => addTime(60)}>
              +1:00
            </button>
            <button className="preset-btn" onClick={() =>  addTime(300)}>
              +5:00
            </button>
          </div>
        </div>

        <div className="timer-footer">
          {/* 8. O'ZGARTIRILDI: Play tugmasiga startTimer o'rniga toggleTimer (Play/Pause) ulandi */}
          <button
            onClick={toggleTimer}
            className="play-btn"
            aria-label={isStartTimer ? "Pause" : "Start"}
          >
            {isStartTimer ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            )}
          </button>

          <button onClick={stopTimer} className="stop-btn" aria-label="Stop">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
