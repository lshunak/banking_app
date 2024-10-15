import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
            // Send signup data to backend
            await axios.post('http://localhost:5000/authentication/signup', formData);

            // Show success message
            setError('');
            setSuccessMessage('Registration successful! Please check your email for a verification link.');
        } catch (error) {
            console.error('Error signing up:', error);
            // Set error message to state
            setError('User already exists or invalid data');
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
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </form>
            </main>
        </div>
    );
}

export default SignUpPage;