// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Spinner from './components/ui/Spinner';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const { initialising } = useAuth();

  if (initialising) {
    return <Spinner />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
