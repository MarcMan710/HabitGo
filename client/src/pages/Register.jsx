// pages/Register.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { register } from '../services/userService'; // Import the register service

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        try {
            const user = await register(formData);
            console.log('Registration successful', user);
            navigate('/login'); // Redirect to login page on successful registration
        } catch (error) {
            console.error('Registration error', error.response?.data || error.message);
            // Optionally, display an error message to the user
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <RegisterForm onRegister={handleRegister} />
            </div>
        </div>
    );
};

export default Register;
