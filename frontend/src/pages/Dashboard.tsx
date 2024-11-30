import React from 'react';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import AccountList from '../components/AccountList';
import TransactionList from '../components/TransactionList';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <Header />
            <h1>Welcome To your Dashboard</h1>
            <UserInfo />
            <AccountList />
            <TransactionList />
        </div>
    );
};

export default Dashboard;
