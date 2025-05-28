// components/habits/HabitForm.jsx
import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../ui/Button';

const HabitForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'other',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', category: 'other' }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{initialData._id ? 'Edit Habit' : 'Add New Habit'}</h2>
      <InputField
        label="Title"
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <InputField
        label="Description"
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="health">Health</option>
          <option value="work">Work</option>
          <option value="learning">Learning</option>
          <option value="personal">Personal</option>
          <option value="fitness">Fitness</option>
          <option value="other">Other</option>
        </select>
      </div>
      <Button type="submit" className="w-full">
        {initialData._id ? 'Update Habit' : 'Add Habit'}
      </Button>
    </form>
  );
};

export default HabitForm;
