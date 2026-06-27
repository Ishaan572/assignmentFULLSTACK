import { useState } from "react";
/* eslint-disable react/prop-types */
import { useLocalStorage } from "../hooks/useLocalStorage";

const getTodayString = () => new Date().toISOString().split("T")[0];

const getOffsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const groupTasks = (tasks) => {
  const today = getTodayString();
  const parents = tasks.filter(t => !t.parentId);
  
  return {
    overdue: parents.filter(t => t.dueDate && t.dueDate < today && !t.completed),
    today: parents.filter(t => t.dueDate === today && !t.completed),
    upcoming: parents.filter(t => t.dueDate && t.dueDate > today && !t.completed),
    noDate: parents.filter(t => !t.dueDate && !t.completed),
    completed: parents.filter(t => t.completed)
  };
};

export default function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage("cipher-tasks", []);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = { 
      id: Date.now(), 
      title: newTaskTitle, 
      dueDate: "", 
      completed: false, 
      parentId: null 
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id && t.parentId !== id));
  };

  const addSubtask = (parentId, title) => {
    const newSub = { id: Date.now(), title, dueDate: "", completed: false, parentId };
    setTasks([...tasks, newSub]);
  };

  const grouped = groupTasks(tasks);

  const renderGroup = (title, groupTasks, color) => {
    if (groupTasks.length === 0) return null;
    return (
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color, textTransform: "uppercase", margin: "10px 0" }}>
          {title} ({groupTasks.length})
        </h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {groupTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              allTasks={tasks} 
              updateTask={updateTask} 
              deleteTask={deleteTask} 
              addSubtask={addSubtask}
            />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>TaskBoard</h2>
      <form onSubmit={handleQuickAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Press Enter to quick-add a task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
      </form>

      {renderGroup("Overdue", grouped.overdue, "#ff4444")}
      {renderGroup("Today", grouped.today, "#44ff44")}
      {renderGroup("Upcoming", grouped.upcoming, "#4444ff")}
      {renderGroup("No Date", grouped.noDate, "#aaaaaa")}
      {renderGroup("Completed", grouped.completed, "#555555")}
    </div>
  );
}

function TaskItem({ task, allTasks, updateTask, deleteTask, addSubtask }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(task.title);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const subtasks = allTasks.filter(s => s.parentId === task.id);
  const completedSubtasks = subtasks.filter(s => s.completed).length;

  const handleToggleComplete = () => {
    setIsFading(true);
    setTimeout(() => {
      updateTask(task.id, { completed: !task.completed });
      setIsFading(false);
    }, 400); 
  };

  const handleTitleSave = () => {
    if (titleInput.trim()) updateTask(task.id, { title: titleInput });
    setIsEditingTitle(false);
  };

  return (
    <li style={{ 
      padding: "12px", 
      border: "1px solid #333", 
      marginBottom: "8px",
      borderRadius: "6px",
      opacity: isFading ? 0 : 1, 
      transition: "opacity 400ms ease",
      backgroundColor: task.completed ? "#1a1a1a" : "#222"
    }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={handleToggleComplete} 
        />
        
        {isEditingTitle ? (
          <input 
            autoFocus
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
            style={{ flexGrow: 1 }}
          />
        ) : (
          <span 
            onClick={() => !task.completed && setIsEditingTitle(true)}
            style={{ 
              flexGrow: 1, 
              cursor: "pointer",
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#666" : "#fff"
            }}
          >
            {task.title}
          </span>
        )}

        {subtasks.length > 0 && (
          <span style={{ fontSize: "12px", color: "#888", background: "#333", padding: "2px 6px", borderRadius: "10px" }}>
            {completedSubtasks}/{subtasks.length}
          </span>
        )}

        <button onClick={() => setShowDatePicker(!showDatePicker)} style={{ fontSize: "12px", padding: "4px 8px" }}>
          📅 {task.dueDate || "No Date"}
        </button>

        <button onClick={() => deleteTask(task.id)} style={{ color: "#ff4444", background: "none", border: "none", cursor: "pointer" }}>
          X
        </button>
      </div>

      {showDatePicker && (
        <div style={{ marginTop: "10px", display: "flex", gap: "5px", flexWrap: "wrap" }}>
          <button onClick={() => { updateTask(task.id, { dueDate: getOffsetDate(0) }); setShowDatePicker(false); }}>Today</button>
          <button onClick={() => { updateTask(task.id, { dueDate: getOffsetDate(1) }); setShowDatePicker(false); }}>Tomorrow</button>
          <button onClick={() => { updateTask(task.id, { dueDate: getOffsetDate(7) }); setShowDatePicker(false); }}>Next Week</button>
          <input 
            type="date" 
            value={task.dueDate} 
            onChange={(e) => { updateTask(task.id, { dueDate: e.target.value }); setShowDatePicker(false); }} 
            style={{ padding: "4px" }}
          />
          <button onClick={() => { updateTask(task.id, { dueDate: "" }); setShowDatePicker(false); }}>Clear</button>
        </div>
      )}

      {!task.completed && (
        <div style={{ marginLeft: "24px", marginTop: "10px", borderLeft: "2px solid #444", paddingLeft: "10px" }}>
          {subtasks.map(subtask => (
             <TaskItem 
               key={subtask.id} 
               task={subtask} 
               allTasks={allTasks} 
               updateTask={updateTask} 
               deleteTask={deleteTask} 
               addSubtask={addSubtask}
             />
          ))}
          
          <input 
            type="text" 
            placeholder="+ Add subtask..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newSubtaskTitle.trim()) {
                addSubtask(task.id, newSubtaskTitle);
                setNewSubtaskTitle("");
              }
            }}
            style={{ marginTop: "8px", width: "100%", padding: "6px", boxSizing: "border-box" }}
          />
        </div>
      )}
    </li>
  );
}