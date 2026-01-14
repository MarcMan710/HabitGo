import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';

import Button from '../ui/Button'; // Import the custom Button component
const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (onRegister) onRegister(formData);
  };

  return (
    <>
    <form onSubmit={onSubmit} className="p-8 bg-background border border-border rounded-lg shadow-lg space-y-6 max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-form-title mb-6">Register for HabitGo</h2>
      <InputField
          label="Username"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <Button type="submit" variant="primary" className="w-full"> {/* Use the Button component */}
          Register
        </Button>
        <p className="mt-6 text-center text-sm text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors duration-200">
          Login
        </Link>
      </p>
    </form>
    </>
  );
};

export default RegisterForm;
