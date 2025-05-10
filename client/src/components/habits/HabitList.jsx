// components/habits/HabitList.jsx
import HabitCard from './HabitCard';

const HabitList = ({ habits, onCheck, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          onCheck={onCheck}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HabitList;
