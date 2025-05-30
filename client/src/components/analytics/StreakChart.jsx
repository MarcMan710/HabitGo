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
import { getStreakData } from '../../services/analyticsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StreakChart = ({ habit }) => {
  const data = getStreakData(habit);

  const chartData = {
    labels: data.map(d => d.streakLength),
    datasets: [
      {
        label: 'Number of Streaks',
        data: data.map(d => d.count),
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
        position: 'top'
      },
      title: {
        display: true,
        text: 'Streak Distribution'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Streaks'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Streak Length (days)'
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

export default StreakChart; 