import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './UserInfo.css';

const UserInfo: React.FC = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="user-info">
            <h2>Profile Information</h2>
            <div className="user-details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default UserInfo;
