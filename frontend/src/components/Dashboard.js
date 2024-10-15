import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin'); // Redirect to sign in if no token
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/data', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data');
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Welcome!</h1>
                <button onClick={handleLogout} className="button">Logout</button>
            </header>
            <main className="main">
                {error && <p className="error-message">{error}</p>}
                {userData && (
                    <div className="user-info">
                        <h2>Welcome, {userData.username}!</h2>
                        <p>Email: {userData.email}</p>
                        <p>Account Balance: ${userData.balance}</p>
                        {/* Display other user-specific information here */}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
