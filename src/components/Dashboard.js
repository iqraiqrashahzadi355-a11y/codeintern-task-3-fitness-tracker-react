import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ activities, weeklyGoal }) {
  const summary = {};
  let totalCalories = 0;
  let totalSteps = 0;

  activities.forEach(a => {
    summary[a.date] = (summary[a.date] || 0) + a.calories;
    totalCalories += a.calories;
    totalSteps += a.steps || 0;
  });

  const dates = Object.keys(summary).sort();
  const calories = dates.map(d => summary[d]);

  const progressPercent = Math.min((totalCalories / weeklyGoal) * 100, 100);

  return (
    <div className="dashboard">
      <h2>Weekly Summary</h2>

      {activities.length === 0 ? <p>No activities yet.</p> :
      <>
        <Bar
          data={{
            labels: dates,
            datasets: [{
              label: "Calories Burned",
              data: calories,
              backgroundColor: "rgba(99, 102, 241, 0.6)"
            }]
          }}
          options={{ responsive: true, plugins: { legend: { display: true } } }}
        />

        <div className="progress-container">
          <h3>Total Calories: {totalCalories} / {weeklyGoal}</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <h3>Total Steps: {totalSteps}</h3>
        </div>
      </>}
    </div>
  );
}
