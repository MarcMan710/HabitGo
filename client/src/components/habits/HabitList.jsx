// components/habits/HabitList.jsx
import { useState } from 'react';
import HabitCard from './HabitCard';

const HabitList = ({ habits, onCheck, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'health', 'work', 'learning', 'personal', 'fitness', 'other'];

  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter(habit => habit.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                ? 'bg-primary text-white shadow-sm'
                : 'bg-secondary-light text-text hover:bg-secondary-light/70'}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHabits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            onCheck={onCheck}
            onDelete={onDelete}
          />
        ))}
      </div>
      {filteredHabits.length === 0 && (
        <p className="text-center text-secondary mt-6">
          No habits found in this category.
        </p>
      )}
    </div>
  );
};

export default HabitList;
