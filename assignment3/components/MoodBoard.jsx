/* eslint-disable react/prop-types */
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function MoodBoard() {
  const [items, setItems] = useLocalStorage("cipher-moods", []);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newItem = {
      id: Date.now(),
      value: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const isColor = (val) => val.startsWith("#") || /^[a-zA-Z]+$/.test(val);

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>MoodBoard</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter hex color (#ff0000) or image URL..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
      </form>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", 
        gap: "10px" 
      }}>
        {items.map(item => (
          <div 
            key={item.id}
            onClick={() => removeItem(item.id)}
            style={{
              aspectRatio: "1",
              cursor: "pointer",
              borderRadius: "8px",
              border: "2px solid #333",
              overflow: "hidden",
              backgroundColor: isColor(item.value) ? item.value : "#222",
              backgroundImage: !isColor(item.value) ? `url(${item.value})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            title="Click to remove"
          />
        ))}
      </div>
    </div>
  );
}