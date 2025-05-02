// components/auth/LoginForm.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    if (res.ok) {
      login(result);
    } else {
      // Consider a more user-friendly error display, e.g., using a state variable for error messages
      alert(result.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input type="email" placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="input mb-2 w-full" required />
      <input type="password" placeholder="Password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="input mb-4 w-full" required />
      <button type="submit" className="btn w-full">Login</button>
    </form>
  );
};

export default LoginForm;
