// components/habits/HabitCard.jsx
import Button from '../ui/Button';
import { calculateCompletionRate, getStreakBadge } from '../../services/habitService';

const HabitCard = ({ habit, onCheck, onDelete }) => {
  const today = new Date().toISOString().split('T')[0];
  const isChecked = habit.daysCompleted.some(
    (d) => new Date(d).toISOString().split('T')[0] === today
  );

  const getCategoryColor = (category) => {
    const colors = {
      health: 'bg-green-100 text-green-800',
      work: 'bg-blue-100 text-blue-800',
      learning: 'bg-purple-100 text-purple-800',
      personal: 'bg-yellow-100 text-yellow-800',
      fitness: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const getScheduleLabel = (schedule) => {
    switch (schedule.type) {
      case 'daily':
        return 'Daily';
      case 'weekdays':
        return 'Weekdays Only';
      case 'weekends':
        return 'Weekends Only';
      case 'custom':
        const days = schedule.customDays.map(day => {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return days[day];
        });
        return `Custom (${days.join(', ')})`;
      case 'everyXDays':
        return `Every ${schedule.everyXDays} Days`;
      default:
        return 'Daily';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{habit.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(habit.category)}`}>
          {habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}
        </span>
      </div>
      <p className="text-sm text-gray-600">{habit.description}</p>
      <div className="mt-2">
        <span className="text-xs text-gray-500">Schedule: </span>
        <span className="text-xs font-medium text-indigo-600">{getScheduleLabel(habit.schedule)}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">Completion Rate: <span className="font-semibold">{calculateCompletionRate(habit)}%</span></p>
      {getStreakBadge(habit.daysCompleted) && (
        <p className="text-xs text-yellow-600 font-bold mt-1">{getStreakBadge(habit.daysCompleted)}</p>
      )}
      <div className="flex gap-2 mt-3">
        <Button
          onClick={() => onCheck(habit._id)}
          className={`${
            isChecked ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-3 rounded-md text-sm font-medium`}
          disabled={isChecked}
        >
          {isChecked ? 'Completed' : 'Mark Done'}
        </Button>
        <Button 
          onClick={() => onDelete(habit._id)} 
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default HabitCard;
