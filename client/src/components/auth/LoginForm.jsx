// components/auth/LoginForm.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ErrorMessage from '../common/ErrorMessage';
import InputField from '../common/InputField'; // Import InputField
import Button from '../ui/Button'; // Import the custom Button component

const LoginForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    // Clear error when user starts typing again
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (res.ok) {
        login(result); // Assuming result contains user data and token
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Removed max-w-md mx-auto here as the parent page now handles centering and max-width
    <form onSubmit={handleSubmit} className="p-8 bg-background border border-border rounded-lg shadow-lg space-y-6 max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-form-title mb-6">Login to HabitGo</h2>
      <InputField
        label="Email Address"
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <InputField
        label="Password"
        id="password" name="password" type="password" placeholder="Password" value={form.password}
        onChange={handleChange} required disabled={isLoading}
      />
      {error && <ErrorMessage message={error} />}
      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}> {/* Use the Button component */}
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      <p className="mt-6 text-center text-sm text-secondary">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:text-primary-dark transition-colors duration-200">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
