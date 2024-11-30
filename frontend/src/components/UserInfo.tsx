import React from 'react';

type UserData = {
    username: string;
    email: string;
};

const mockUser: UserData = {
    username: "John Doe",
    email: "john.doe@example.com",
};

const UserInfo: React.FC = () => {
    return (
        <div className="user-info">
            <h2>Profile Information</h2>
            <div className="user-details">
                <p><strong>Username:</strong> {mockUser.username}</p>
                <p><strong>Email:</strong> {mockUser.email}</p>
            </div>
        </div>
    );
};

export default UserInfo;
