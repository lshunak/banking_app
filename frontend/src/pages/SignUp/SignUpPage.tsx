import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api'; // Import the signUp function from api.ts
import { SignupData } from '../../api';
import '../../App.css';

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState<SignupData>({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await signup(formData);
            setSuccess('Account created successfully! Please check your email for verification.');
            // Add delay before redirect to show success message
            setTimeout(() => {
                navigate('/signin');
            }, 3000);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Failed to create account');
            } else {
                setError('Failed to create account. Please try again.');
            }
            console.error('Signup error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
