// components/habits/HabitForm.jsx
import { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../ui/Button';
import { requestNotificationPermission } from '../../services/notificationService';

const HabitForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'other',
    schedule: initialData.schedule || {
      type: 'daily',
      customDays: [],
      everyXDays: 2
    },
    reminder: initialData.reminder || {
      enabled: false,
      time: '09:00',
      days: [0, 1, 2, 3, 4, 5, 6]
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('customDay')) {
      const dayNumber = parseInt(name.replace('customDay', ''));
      const newCustomDays = form.schedule.customDays.includes(dayNumber)
        ? form.schedule.customDays.filter(d => d !== dayNumber)
        : [...form.schedule.customDays, dayNumber];
      
      setForm(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          customDays: newCustomDays
        }
      }));
    } else if (name === 'scheduleType') {
      setForm(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          type: value,
          customDays: value === 'custom' ? prev.schedule.customDays : [],
          everyXDays: value === 'everyXDays' ? prev.schedule.everyXDays : 2
        }
      }));
    } else if (name === 'everyXDays') {
      setForm(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          everyXDays: parseInt(value)
        }
      }));
    } else if (name.startsWith('reminder')) {
      const reminderField = name.replace('reminder', '').toLowerCase();
      if (reminderField === 'enabled') {
        setForm(prev => ({
          ...prev,
          reminder: {
            ...prev.reminder,
            enabled: checked
          }
        }));
      } else if (reminderField === 'time') {
        setForm(prev => ({
          ...prev,
          reminder: {
            ...prev.reminder,
            time: value
          }
        }));
      } else if (reminderField === 'day') {
        const dayNumber = parseInt(value);
        const newDays = form.reminder.days.includes(dayNumber)
          ? form.reminder.days.filter(d => d !== dayNumber)
          : [...form.reminder.days, dayNumber];
        
        setForm(prev => ({
          ...prev,
          reminder: {
            ...prev.reminder,
            days: newDays
          }
        }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Request notification permission if reminders are enabled
    if (form.reminder.enabled) {
      const permitted = await requestNotificationPermission();
      if (!permitted) {
        alert('Please enable notifications to use reminders');
        return;
      }
    }
    
    onSubmit(form);
    setForm({
      title: '',
      description: '',
      category: 'other',
      schedule: {
        type: 'daily',
        customDays: [],
        everyXDays: 2
      },
      reminder: {
        enabled: false,
        time: '09:00',
        days: [0, 1, 2, 3, 4, 5, 6]
      }
    });
  };

  const weekDays = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

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

      <div className="mb-4">
        <label htmlFor="scheduleType" className="block text-gray-700 text-sm font-bold mb-2">
          Schedule Type <span className="text-red-500">*</span>
        </label>
        <select
          id="scheduleType"
          name="scheduleType"
          value={form.schedule.type}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="daily">Daily</option>
          <option value="weekdays">Weekdays Only</option>
          <option value="weekends">Weekends Only</option>
          <option value="custom">Custom Days</option>
          <option value="everyXDays">Every X Days</option>
        </select>
      </div>

      {form.schedule.type === 'custom' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Days
          </label>
          <div className="grid grid-cols-2 gap-2">
            {weekDays.map(day => (
              <label key={day.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`customDay${day.value}`}
                  checked={form.schedule.customDays.includes(day.value)}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="text-sm text-gray-700">{day.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {form.schedule.type === 'everyXDays' && (
        <div className="mb-4">
          <label htmlFor="everyXDays" className="block text-gray-700 text-sm font-bold mb-2">
            Every X Days
          </label>
          <input
            type="number"
            id="everyXDays"
            name="everyXDays"
            min="2"
            value={form.schedule.everyXDays}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="reminderEnabled"
            name="reminderEnabled"
            checked={form.reminder.enabled}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 text-indigo-600"
          />
          <label htmlFor="reminderEnabled" className="ml-2 text-gray-700 text-sm font-bold">
            Enable Reminders
          </label>
        </div>

        {form.reminder.enabled && (
          <>
            <div className="mb-2">
              <label htmlFor="reminderTime" className="block text-gray-700 text-sm font-bold mb-2">
                Reminder Time
              </label>
              <input
                type="time"
                id="reminderTime"
                name="reminderTime"
                value={form.reminder.time}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Reminder Days
              </label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <label key={day.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`reminderDay${day.value}`}
                      value={day.value}
                      checked={form.reminder.days.includes(day.value)}
                      onChange={handleChange}
                      className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                    <span className="text-sm text-gray-700">{day.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Button type="submit" className="w-full">
        {initialData._id ? 'Update Habit' : 'Add Habit'}
      </Button>
    </form>
  );
};

export default HabitForm;
