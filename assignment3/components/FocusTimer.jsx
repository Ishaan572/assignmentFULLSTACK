import { useTimer } from "../hooks/useTimer";

export default function FocusTimer() {
  const { seconds, isRunning, toggleTimer, resetTimer } = useTimer(1500); // 1500s = 25 minutes

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px", maxWidth: "300px" }}>
      <h2 style={{ textAlign: "center" }}>Focus Timer</h2>
      
      <div style={{ fontSize: "48px", textAlign: "center", margin: "20px 0", fontFamily: "monospace" }}>
        {formatTime(seconds)}
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button 
          onClick={toggleTimer} 
          style={{ padding: "10px 20px", backgroundColor: isRunning ? "#ffaa00" : "#44ff44" }}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        
        <button onClick={() => resetTimer(1500)} style={{ padding: "10px 20px" }}>
          Reset
        </button>
      </div>
    </div>
  );
}