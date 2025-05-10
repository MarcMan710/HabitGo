// pages/Login.jsx
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="max-w-md w-full space-y-8">
        <div>
          {/* Optional: Add your logo here */}
          {/* <img className="mx-auto h-12 w-auto" src="/path/to/logo.svg" alt="Workflow" /> */}
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
        </div>
        <LoginForm />
      </section>
    </main>
  );
};

export default Login;
