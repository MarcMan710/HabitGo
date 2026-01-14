import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-background text-text shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-200">
          HabitGo
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-text">Welcome, {user.username}</span>
              <button onClick={logout} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 border border-secondary text-secondary rounded-md hover:bg-secondary-light hover:text-text transition-colors duration-200">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
