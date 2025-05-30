import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

const Calendar = ({ habits }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    
    // Create calendar data with habit completion status
    const calendarData = days.map(day => {
      const dayHabits = habits.filter(habit => {
        const completionDate = new Date(habit.lastCompleted);
        return completionDate.toDateString() === day.toDateString();
      });

      return {
        date: day,
        habits: dayHabits,
        isCurrentMonth: isSameMonth(day, currentDate),
        isToday: isToday(day)
      };
    });

    setMonthData(calendarData);
  }, [currentDate, habits]);

  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {monthData.map((day, index) => (
          <div
            key={index}
            className={`
              p-2 min-h-[80px] border rounded
              ${!day.isCurrentMonth ? 'bg-gray-50' : ''}
              ${day.isToday ? 'border-blue-500' : 'border-gray-200'}
            `}
          >
            <div className="text-sm mb-1">{format(day.date, 'd')}</div>
            <div className="space-y-1">
              {day.habits.map(habit => (
                <div
                  key={habit._id}
                  className="text-xs p-1 bg-green-100 text-green-800 rounded truncate"
                >
                  {habit.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar; 