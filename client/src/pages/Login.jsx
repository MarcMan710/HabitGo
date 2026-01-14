// pages/Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { login } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const userData = await login(credentials);
      authLogin(userData);
      console.log('Login successful', userData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error', error.response?.data || error.message);
      // Optionally, display an error message to the user
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="max-w-md w-full space-y-8">
        <div>
          {/* Optional: Add your logo here */}
          {/* <img className="mx-auto h-12 w-auto" src="/path/to/logo.svg" alt="Workflow" /> */}
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
        </div>
        <LoginForm onLogin={handleLogin} />
      </section>
    </main>
  );
};

export default Login;
