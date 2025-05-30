import WeeklyCompletionChart from './WeeklyCompletionChart';
import TimeOfDayChart from './TimeOfDayChart';
import StreakChart from './StreakChart';

const HabitAnalytics = ({ habit }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics for {habit.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Completion Rate</h3>
          <WeeklyCompletionChart habit={habit} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Time of Day Analysis</h3>
          <TimeOfDayChart habit={habit} />
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Streak Analysis</h3>
          <StreakChart habit={habit} />
        </div>
      </div>
    </div>
  );
};

export default HabitAnalytics; 