import { useState } from "react";

export default function AddActivity({ addActivity }) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [steps, setSteps] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !duration || !calories) return alert("Fill all fields");
    addActivity({
      type,
      duration: +duration,
      calories: +calories,
      steps: +steps || 0,
      date,
    });
    setType(""); setDuration(""); setCalories(""); setSteps(""); setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form className="add-activity" onSubmit={handleSubmit}>
      <input placeholder="Exercise Type" value={type} onChange={e => setType(e.target.value)} />
      <input placeholder="Duration (min)" type="number" value={duration} onChange={e => setDuration(e.target.value)} />
      <input placeholder="Calories Burned" type="number" value={calories} onChange={e => setCalories(e.target.value)} />
      <input placeholder="Steps" type="number" value={steps} onChange={e => setSteps(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit">Add Activity</button>
    </form>
  );
}
