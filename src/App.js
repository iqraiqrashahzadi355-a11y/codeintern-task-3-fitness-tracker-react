import { useEffect, useState } from "react";
import AddActivity from "./components/AddActivity";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("activities");
    return saved ? JSON.parse(saved) : [];
  });
  const [dark, setDark] = useState(false);
  const [filter, setFilter] = useState("All");
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    const saved = localStorage.getItem("weeklyGoal");
    return saved ? +saved : 2000; // default 2000 calories/week
  });

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("weeklyGoal", weeklyGoal);
  }, [weeklyGoal]);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter((a) => a.type === filter);

  const exerciseTypes = [
    ...new Set(activities.map((a) => a.type))
  ];

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <div className="top-bar">
        <h1>Fitness Tracker PRO</h1>
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      <AddActivity addActivity={addActivity} />

      <div className="filters">
        <label>Filter Exercise:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          {exerciseTypes.map((t, idx) => (
            <option key={idx}>{t}</option>
          ))}
        </select>

        <label>Weekly Goal:</label>
        <input
          type="number"
          value={weeklyGoal}
          onChange={(e) => setWeeklyGoal(+e.target.value)}
        />
      </div>

      <Dashboard
        activities={filteredActivities}
        weeklyGoal={weeklyGoal}
      />
    </div>
  );
}
