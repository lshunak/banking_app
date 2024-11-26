import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../api';

type UserInfo = {
    username: string;
    email: string;
    phone: string;
};

const UserInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    setError('User is not authenticated');
                    return;
                }

                const data = await getUserInfo(token);
                setUserInfo(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch user information');
            }
        };

        fetchUserInfo();
    }, []);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!userInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-info">
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Phone:</strong> {userInfo.phone}</p>
        </div>
    );
};

export default UserInfo;
