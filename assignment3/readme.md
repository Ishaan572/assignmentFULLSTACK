https://maxcipher.netlify.app/

# Cipher 🚀

**Cipher** is a lightweight, high-performance personal productivity dashboard built with React. It is designed to be a daily driver for task management, goal tracking, focused work sessions, and inspiration—all running entirely in your browser with no need for a backend database.

## 🌟 Key Features

* **TaskBoard:** A robust task manager supporting flat relational subtasks, cascading deletions, inline editing, and smart date-based grouping (Overdue/Today/Upcoming).
* **GoalTracker:** A visual tracker for your long-term objectives with progress bars, inline editing, and target date settings.
* **FocusTimer:** A custom-hook-powered countdown timer (Pomodoro style) that persists state across browser refreshes.
* **MoodBoard:** A responsive CSS-grid-based canvas for hex colors and image URLs to keep you inspired.
* **Persistent State:** All data is saved automatically to the browser’s `localStorage`. Your dashboard stays exactly as you left it, every single time.
* **Vibrant Azure Theme:** A clean, professional UI designed for high readability and focus.

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **State Management:** React Hooks (`useState`, `useEffect`, custom `useLocalStorage` hook)
* **Styling:** CSS-in-JS (Inline styles with a unified theme object)
* **Storage:** Browser `localStorage` (JSON serialization)
