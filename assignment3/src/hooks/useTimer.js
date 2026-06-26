import { useState, useEffect } from "react";

export function useTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = (newSeconds = initialSeconds) => {
    setIsRunning(false);
    setSeconds(newSeconds);
  };

  return { seconds, isRunning, toggleTimer, resetTimer };
}
