import React from 'react';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import AccountInfo from '../components/AccountInfo';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <Header />
            <h1>Dashboard</h1>
            <UserInfo />
        </div>
    );
};

export default Dashboard;
