import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getWeeklyCompletionData } from '../../services/analyticsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyCompletionChart = ({ habit }) => {
  const data = getWeeklyCompletionData(habit);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Completed',
        data: data.map(d => d.completed ? 1 : 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Weekly Completion'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: value => value === 1 ? 'Yes' : 'No'
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default WeeklyCompletionChart; 