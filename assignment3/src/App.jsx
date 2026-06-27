import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskBoard from "./components/TaskBoard";
import GoalTracker from "./components/GoalTracker";
import FocusTimer from "./components/FocusTimer";
import MoodBoard from "./components/MoodBoard";

export default function App() {
  const [activeSection, setActiveSection] = useLocalStorage("cipher-active-tab", "tasks");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      
      <nav style={{ width: "200px", padding: "20px", borderRight: "1px solid #444", backgroundColor: "#111" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "30px", color: "#fff" }}>Cipher</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {["tasks", "goals", "timer", "mood"].map((section) => (
            <li 
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                padding: "10px",
                marginBottom: "5px",
                cursor: "pointer",
                textTransform: "capitalize",
                color: activeSection === section ? "#fff" : "#888",
                backgroundColor: activeSection === section ? "#333" : "transparent",
                borderRadius: "4px"
              }}
            >
              {section}
            </li>
          ))}
        </ul>
      </nav>

      <main style={{ flexGrow: 1, overflowY: "auto", padding: "20px", backgroundColor: "#000", color: "#fff" }}>
        {activeSection === "tasks" && <TaskBoard />}
        {activeSection === "goals" && <GoalTracker />}
        {activeSection === "timer" && <FocusTimer />}
        {activeSection === "mood" && <MoodBoard />}
      </main>
      
    </div>
  );
}