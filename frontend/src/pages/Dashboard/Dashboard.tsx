import React from 'react';
import UserInfo from '../../components/UserInfo/UserInfo';
import AccountList from '../../components/Account/AccountList';
import TransactionList from '../../components/Transaction/TransactionList';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Welcome To your Dashboard</h1>
            <UserInfo />
            <AccountList />
            <TransactionList />
        </div>
    );
};

export default Dashboard;
