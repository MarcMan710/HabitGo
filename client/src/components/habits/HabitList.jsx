import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabits, deleteHabit } from '../../store/habits';
import HabitItem from './HabitItem';
import HabitForm from './HabitForm';
import './HabitList.css';

const HabitList = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleHabitDelete = (id) => {
    dispatch(deleteHabit(id));
  };

  const renderHabitItems = () => {
    return habits.map((habit) => (
      <HabitItem
        key={habit._id}
        habit={habit}
        onDelete={() => handleHabitDelete(habit._id)}
      />
    ));
  };

  const renderHabitForm = () => {
    return showForm && <HabitForm setShowForm={setShowForm} />;
  };

  const buttonText = showForm ? 'Cancel' : 'Add Habit';

  return (
    <div className="habit-list-container">
      <h2>Your Habits</h2>
      <button onClick={handleToggleForm} className="add-habit-button">{buttonText}</button>
      {renderHabitForm()}
      <ul className="habit-list">{renderHabitItems()}</ul>
    </div>
  );
};

export default HabitList;
