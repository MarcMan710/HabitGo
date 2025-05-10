// components/habits/HabitForm.jsx
import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../ui/Button';

const HabitForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '' }); // Reset form after submission
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
      <Button type="submit" className="w-full">
        {initialData._id ? 'Update Habit' : 'Add Habit'}
      </Button>
    </form>
  );
};

export default HabitForm;
