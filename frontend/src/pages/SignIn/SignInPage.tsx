import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../App.css';

const SignInPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Login failed. Please check your credentials.');
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
