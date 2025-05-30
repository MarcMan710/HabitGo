import { format, startOfWeek, endOfWeek, eachDayOfInterval, parseISO, isWithinInterval } from 'date-fns';

// Calculate completion rate for a specific time period
export const calculateCompletionRate = (habit, startDate, endDate) => {
  const periodDays = eachDayOfInterval({ start: startDate, end: endDate });
  const completedDays = habit.daysCompleted.filter(date => 
    isWithinInterval(parseISO(date), { start: startDate, end: endDate })
  );
  return (completedDays.length / periodDays.length) * 100;
};

// Get completion data for the last 7 days
export const getWeeklyCompletionData = (habit) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const completionData = daysOfWeek.map(day => {
    const completions = habit.completions.filter(c => {
      const date = new Date(c.date);
      return date.toLocaleDateString('en-US', { weekday: 'long' }) === day;
    });
    
    return {
      day,
      count: completions.length,
      total: habit.schedule.days.filter(d => d === day.toLowerCase()).length
    };
  });

  return completionData;
};

// Get completion data by time of day
export const getTimeOfDayData = (habit) => {
  const timeSlots = ['morning', 'afternoon', 'evening', 'night'];
  
  const timeData = timeSlots.map(slot => {
    const completions = habit.completions.filter(c => {
      const hour = new Date(c.date).getHours();
      if (slot === 'morning') return hour >= 5 && hour < 12;
      if (slot === 'afternoon') return hour >= 12 && hour < 17;
      if (slot === 'evening') return hour >= 17 && hour < 22;
      return hour >= 22 || hour < 5;
    });
    
    return {
      timeSlot: slot,
      count: completions.length
    };
  });

  return timeData;
};

// Calculate current streak
export const calculateCurrentStreak = (habit) => {
  if (!habit.daysCompleted.length) return 0;

  const sortedDates = habit.daysCompleted
    .map(date => parseISO(date))
    .sort((a, b) => b - a);

  let streak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

// Get monthly completion data
export const getMonthlyCompletionData = (habit) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const days = eachDayOfInterval({ start: startOfMonth, end: today });

  return days.map(day => {
    const isCompleted = habit.daysCompleted.some(date => 
      format(parseISO(date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    return {
      date: format(day, 'd'),
      completed: isCompleted
    };
  });
};

// Get category-wise completion rates
export const getCategoryCompletionRates = (habits) => {
  const categories = {};
  
  habits.forEach(habit => {
    if (!categories[habit.category]) {
      categories[habit.category] = {
        total: 0,
        completed: 0
      };
    }
    
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const completionRate = calculateCompletionRate(habit, startOfMonth, today);
    
    categories[habit.category].total++;
    categories[habit.category].completed += completionRate;
  });

  return Object.entries(categories).map(([category, data]) => ({
    category,
    rate: data.completed / data.total
  }));
};

// Get habit trends (completion rate over time)
export const getHabitTrends = (habit, days = 30) => {
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - days);

  const completionRates = [];
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + i);
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const rate = calculateCompletionRate(habit, currentDate, nextDate);
    completionRates.push({
      date: format(currentDate, 'MMM d'),
      rate
    });
  }

  return completionRates;
};

// Get streak data
export const getStreakData = (habit) => {
  const completions = habit.completions
    .map(c => new Date(c.date))
    .sort((a, b) => a - b);

  const streaks = [];
  let currentStreak = 1;
  
  for (let i = 1; i < completions.length; i++) {
    const prevDate = completions[i - 1];
    const currDate = completions[i];
    
    const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak++;
    } else {
      if (currentStreak > 1) {
        streaks.push(currentStreak);
      }
      currentStreak = 1;
    }
  }
  
  if (currentStreak > 1) {
    streaks.push(currentStreak);
  }

  // Count frequency of each streak length
  const streakCounts = {};
  streaks.forEach(streak => {
    streakCounts[streak] = (streakCounts[streak] || 0) + 1;
  });

  return Object.entries(streakCounts).map(([streakLength, count]) => ({
    streakLength: parseInt(streakLength),
    count
  })).sort((a, b) => a.streakLength - b.streakLength);
};

// Get current streak
export const getCurrentStreak = (habit) => {
  const completions = habit.completions
    .map(c => new Date(c.date))
    .sort((a, b) => b - a);

  if (completions.length === 0) return 0;

  let currentStreak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastCompletion = completions[0];
  lastCompletion.setHours(0, 0, 0, 0);

  // If the last completion was not today or yesterday, streak is broken
  const diffDays = Math.floor((today - lastCompletion) / (1000 * 60 * 60 * 24));
  if (diffDays > 1) return 0;

  for (let i = 1; i < completions.length; i++) {
    const currDate = completions[i];
    const prevDate = completions[i - 1];
    
    const diffDays = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
};

// Get longest streak
export const getLongestStreak = (habit) => {
  const streaks = getStreakData(habit);
  return streaks.length > 0 ? Math.max(...streaks.map(s => s.streakLength)) : 0;
};

// Get success rate
export const getSuccessRate = (habit) => {
  const completions = habit.completions.length;
  const totalDays = habit.schedule.days.length;
  const startDate = new Date(habit.startDate);
  const today = new Date();
  
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const expectedCompletions = Math.floor(daysSinceStart / 7) * totalDays;
  
  return expectedCompletions > 0 ? (completions / expectedCompletions) * 100 : 0;
}; 