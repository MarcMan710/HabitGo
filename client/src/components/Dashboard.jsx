import HabitAnalytics from './analytics/HabitAnalytics';

const Dashboard = () => {
  const [selectedHabit, setSelectedHabit] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Habits</h2>
            <div className="space-y-4">
              {habits.map(habit => (
                <div
                  key={habit._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedHabit(habit)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{habit.name}</h3>
                      <p className="text-sm text-gray-600">
                        {habit.schedule.type === 'daily' ? 'Daily' :
                         habit.schedule.type === 'weekly' ? `Weekly (${habit.schedule.days.join(', ')})` :
                         `Every ${habit.schedule.interval} days`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        Current Streak: {getCurrentStreak(habit)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteHabit(habit._id);
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar habits={habits} />
          </div>
        </div>
      </div>

      {selectedHabit && (
        <div className="mt-8">
          <HabitAnalytics habit={selectedHabit} />
        </div>
      )}
    </div>
  );
};

export default Dashboard; 