// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { HabitProvider } from './contexts/HabitContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HabitProvider>
      <App />
    </HabitProvider>
  </AuthProvider>
);
