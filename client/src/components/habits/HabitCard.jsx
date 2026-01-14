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
      health: 'bg-green-50 text-green-700 ring-green-600/20',
      work: 'bg-blue-50 text-blue-700 ring-blue-600/20',
      learning: 'bg-purple-50 text-purple-700 ring-purple-600/20',
      personal: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
      fitness: 'bg-red-50 text-red-700 ring-red-600/20',
      other: 'bg-gray-50 text-gray-700 ring-gray-600/20'
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
    <div className="bg-background border border-border rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-primary">{habit.title}</h3>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getCategoryColor(habit.category)}`}>
          {habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}
        </span>
      </div>
      <p className="text-sm text-secondary mb-4">{habit.description}</p>
      <div className="mt-2 text-sm">
        <span className="text-secondary">Schedule: </span>
        <span className="font-medium text-primary">{getScheduleLabel(habit.schedule)}</span>
      </div>
      <p className="text-sm text-secondary mt-1">Completion Rate: <span className="font-semibold text-text">{calculateCompletionRate(habit)}%</span></p>
      {getStreakBadge(habit.daysCompleted) && (
        <p className="text-sm text-accent font-bold mt-1">{getStreakBadge(habit.daysCompleted)}</p>
      )}
      <div className="flex gap-3 mt-4">
        <Button
          onClick={() => onCheck(habit._id)}
          variant={isChecked ? 'secondary' : 'primary'}
          size="sm"
          disabled={isChecked}
        >
          {isChecked ? 'Completed' : 'Mark Done'}
        </Button>
        <Button 
          onClick={() => onDelete(habit._id)} 
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default HabitCard;
