import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function SignInPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send signin data to backend
            const response = await axios.post('http://localhost:5000/authentication/signin', formData);
            const { token,  userId} = response.data;

            // Save the JWT token, e.g., in localStorage
            localStorage.setItem('token', token);

            // Redirect to dashboard after successful sign in
            navigate('/dashboard');

        } catch (error) {
            console.error('Error signing in:', error);

            if (error.response && error.response.data) {
                // Handle specific errors based on response from backend
                if (error.response.status === 404) {
                    setError('User not found');
                } else if (error.response.status === 400) {
                    setError('Invalid credentials');
                } else if (error.response.status === 403) {
                    setError('Email not verified. Please check your email.');
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            } else {
                // Handle network errors or other unexpected errors
                setError('Unable to connect to the server. Please check your network connection.');
            }
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Sign In</h1>
            </header>
            <main className="main">
                <form onSubmit={handleSubmit} className="form">
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit" className="button">
                        Sign In
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </main>
        </div>
    );
}

export default SignInPage;
