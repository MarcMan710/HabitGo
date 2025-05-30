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
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      <form onSubmit={onSubmit}>
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
      </form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
