// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Spinner from './components/ui/Spinner';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { initialising } = useAuth();

  if (initialising) {
    return <Spinner />;
  }

  return (
    <Router>
      <Routes><Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /></Routes>
    </Router>
  );
}

export default App;
