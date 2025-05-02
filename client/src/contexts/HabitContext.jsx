// contexts/HabitContext.jsx
import { createContext, useContext, useState } from 'react';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  const loadHabits = async (token) => {
    const res = await fetch('/api/habits', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setHabits(data);
  };

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const updateHabit = (updatedHabit) => {
    setHabits(habits.map(habit => habit._id === updatedHabit._id ? updatedHabit : habit));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit._id !== id));
  };

  return (
    <HabitContext.Provider value={{ habits, loadHabits, addHabit, updateHabit, deleteHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
