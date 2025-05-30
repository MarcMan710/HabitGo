// services/notificationService.js

// Request notification permission
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Check if notifications are supported and permitted
export const checkNotificationSupport = () => {
  return 'Notification' in window && Notification.permission === 'granted';
};

// Schedule a notification
export const scheduleNotification = (habit) => {
  if (!checkNotificationSupport() || !habit.reminder.enabled) return;

  const now = new Date();
  const [hours, minutes] = habit.reminder.time.split(':').map(Number);
  const scheduledTime = new Date(now);
  scheduledTime.setHours(hours, minutes, 0, 0);

  // If the time has already passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  // Schedule the notification
  setTimeout(() => {
    new Notification('Habit Reminder', {
      body: `Time to complete your habit: ${habit.title}`,
      icon: '/favicon.ico',
      tag: `habit-${habit._id}`,
    });
  }, timeUntilNotification);
};

// Schedule notifications for all habits
export const scheduleAllNotifications = (habits) => {
  habits.forEach(habit => {
    if (habit.reminder.enabled) {
      scheduleNotification(habit);
    }
  });
};

// Update notification settings
export const updateNotificationSettings = async (habit, settings) => {
  if (settings.enabled && !checkNotificationSupport()) {
    const permitted = await requestNotificationPermission();
    if (!permitted) {
      return false;
    }
  }
  return true;
}; 