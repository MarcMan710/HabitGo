// pages/Dashboard.jsx
import { useEffect, useCallback } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { useAuth } from '../contexts/AuthContext';
import HabitCard from '../components/habits/HabitCard';
import HabitForm from '../components/habits/HabitForm';

const Dashboard = () => {
  const { habits, loadHabits, setHabits } = useHabits();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.token) {
      loadHabits(user.token);
    }
  }, [user]);

  const handleDelete = useCallback(
    async (id) => {
      await fetch(`/api/habits/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setHabits((prevHabits) => prevHabits.filter((h) => h._id !== id));
    },
    [user, setHabits]
  );

  const handleCheck = useCallback(
    async (id) => {
      const res = await fetch(`/api/habits/check/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const updated = await res.json();
      setHabits((prevHabits) => prevHabits.map((h) => (h._id === updated._id ? updated : h)));
    },
    [user, setHabits]
  );

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Habits</h1>
      <HabitForm />
      <div className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            onDelete={handleDelete}
            onCheck={handleCheck}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
