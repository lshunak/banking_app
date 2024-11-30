import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api'; // Import the signUp function from api.ts
import '../App.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup(formData);
            navigate('/signin');
        } catch (error) {
            console.error('Error signing up:', error);
            setError(  'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Sign Up</h1>
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
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    
                    <button type="submit" className="button">
                        Sign Up
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </main>
        </div>
    );
};

export default SignUpPage;
