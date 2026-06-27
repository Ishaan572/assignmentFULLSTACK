/* eslint-disable react/prop-types */
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function GoalTracker() {
  const [goals, setGoals] = useLocalStorage("cipher-goals", []);
  const [newGoalTitle, setNewGoalTitle] = useState("");

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal = {
      id: Date.now(),
      title: newGoalTitle,
      targetDate: "",
      progress: 0
    };

    setGoals([...goals, newGoal]);
    setNewGoalTitle("");
  };

  const updateGoal = (id, updates) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>GoalTracker</h2>

      <form onSubmit={handleAddGoal} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter a new goal..."
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            updateGoal={updateGoal}
            deleteGoal={deleteGoal}
          />
        ))}
      </div>
    </div>
  );
}

function GoalCard({ goal, updateGoal, deleteGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(goal.title);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (titleInput.trim()) updateGoal(goal.id, { title: titleInput });
    setIsEditing(false);
  };

  const adjustProgress = (amount) => {
    // P2c: Clamps the progress strictly between 0 and 100
    const newProgress = Math.max(0, Math.min(100, goal.progress + amount));
    updateGoal(goal.id, { progress: newProgress });
  };

  return (
    <div style={{ border: "1px solid #444", padding: "15px", borderRadius: "8px", backgroundColor: "#1a1a1a" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        {isEditing ? (
          <input
            autoFocus
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            style={{ flexGrow: 1, marginRight: "10px", padding: "4px" }}
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            style={{ margin: 0, cursor: "pointer", flexGrow: 1 }}
          >
            {goal.title}
          </h3>
        )}
        <button onClick={() => deleteGoal(goal.id)} style={{ color: "#ff4444", background: "none", border: "none", cursor: "pointer" }}>
          X
        </button>
      </div>

      <div style={{ marginBottom: "15px" }}>
          <button onClick={() => setShowDatePicker(!showDatePicker)} style={{ fontSize: "12px", padding: "4px 8px" }}>
            📅 {goal.targetDate || "Set Target Date"}
          </button>
          {showDatePicker && (
            <input
              type="date"
              value={goal.targetDate}
              onChange={(e) => {
                updateGoal(goal.id, { targetDate: e.target.value });
                setShowDatePicker(false);
              }}
              style={{ marginLeft: "10px", padding: "2px" }}
            />
          )}
      </div>

      
      <div style={{ height: "12px", backgroundColor: "#333", borderRadius: "6px", marginBottom: "10px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${goal.progress}%`,
          backgroundColor: goal.progress === 100 ? "#44ff44" : "#4444ff",
          transition: "width 300ms ease, background-color 300ms ease"
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#aaa" }}>
          {goal.progress}%
        </span>
        <div>
          <button onClick={() => adjustProgress(-10)} style={{ marginRight: "5px", padding: "4px 8px" }}>-10%</button>
          <button onClick={() => adjustProgress(10)} style={{ padding: "4px 8px" }}>+10%</button>
        </div>
      </div>

    </div>
  );
}