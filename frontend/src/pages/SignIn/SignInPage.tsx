import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../api'; // Import the signIn function from api.ts
import '../../App.css';

const SignInPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
            const { token } = await signin(formData);
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing in:', error);
            setError('An unexpected error occurred. Please try again.');
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
};

export default SignInPage;
