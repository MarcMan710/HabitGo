// pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHabits } from '../contexts/HabitContext';
import HabitList from '../components/habits/HabitList';
import HabitForm from '../components/habits/HabitForm';
import Calendar from '../components/calendar/Calendar';
import Spinner from '../components/ui/Spinner';
import { scheduleAllNotifications, requestNotificationPermission } from '../services/notificationService';

const Dashboard = () => {
  const { user } = useAuth();
  const { habits, loadHabits, addHabit, updateHabit, deleteHabit } = useHabits();
  const [editingHabit, setEditingHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        await loadHabits(user.token);
        setLoading(false);
      }
    };
    fetchHabits();
  }, [user, loadHabits]);

  // Initialize notifications when habits are loaded
  useEffect(() => {
    if (!loading && habits.length > 0) {
      const initializeNotifications = async () => {
        const permitted = await requestNotificationPermission();
        if (permitted) {
          scheduleAllNotifications(habits);
        }
      };
      initializeNotifications();
    }
  }, [loading, habits]);

  const handleAddHabit = async (habitData) => {
    const res = await fetch('/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(habitData),
    });

    if (res.ok) {
      const newHabit = await res.json();
      addHabit(newHabit);
    } else {
      // Handle errors appropriately
      console.error('Failed to add habit');
    }
  };

  const handleUpdateHabit = async (habitData) => {
    const res = await fetch(`/api/habits/${editingHabit._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(habitData),
    });

    if (res.ok) {
      const updatedHabit = await res.json();
      updateHabit(updatedHabit);
      setEditingHabit(null);
    } else {
      // Handle errors appropriately
      console.error('Failed to update habit');
    }
  };

  const handleDeleteHabit = async (id) => {
    const res = await fetch(`/api/habits/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      deleteHabit(id);
    } else {
      // Handle errors appropriately
      console.error('Failed to delete habit');
    }
  };

  const handleCheckHabit = async (id) => {
    const res = await fetch(`/api/habits/${id}/check`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      const updatedHabit = await res.json();
      updateHabit(updatedHabit);
    } else {
      // Handle errors appropriately
      console.error('Failed to check habit');
    }
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Habits</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <HabitForm
                onSubmit={editingHabit ? handleUpdateHabit : handleAddHabit}
                initialData={editingHabit || {}}
              />
              <HabitList
                habits={habits}
                onCheck={handleCheckHabit}
                onDelete={handleDeleteHabit}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
              <Calendar habits={habits} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
