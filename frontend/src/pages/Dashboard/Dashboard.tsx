import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserInfo from '../../components/UserInfo/UserInfo';
import AccountList from '../../components/Account/AccountList';
import './Dashboard.css';

const Dashboard: React.FC = () => {

    const { user } = useAuth();

    if (!user) {
        // Change to redirect to the homepage
        return <div>Loading...</div>;
      }

    return (
        <div className="dashboard">
            <h1>Welcome, {user.username}!</h1>
            <UserInfo />
            <AccountList />
        </div>
    );
};

export default Dashboard;
