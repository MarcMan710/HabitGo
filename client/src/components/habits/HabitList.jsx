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
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
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
        <p className="text-center text-gray-500 mt-4">
          No habits found in this category.
        </p>
      )}
    </div>
  );
};

export default HabitList;
