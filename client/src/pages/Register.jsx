// pages/Register.jsx
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
