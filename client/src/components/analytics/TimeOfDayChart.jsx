import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { getTimeOfDayData } from '../../services/analyticsService';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const TimeOfDayChart = ({ habit }) => {
  const data = getTimeOfDayData(habit);

  const chartData = {
    labels: data.map(d => d.timeSlot.charAt(0).toUpperCase() + d.timeSlot.slice(1)),
    datasets: [
      {
        data: data.map(d => d.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Completion Time Distribution'
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default TimeOfDayChart; 