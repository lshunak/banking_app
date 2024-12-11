import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './UserInfo.css';

const UserInfo: React.FC = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="user-info">
            <h2>User's Information</h2>
            <div className="user-details">
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default UserInfo;
