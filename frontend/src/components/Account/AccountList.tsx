// src/components/Account/AccountList.tsx
import React, { useEffect, useState } from 'react';
import { getUserAccounts, AccountResponse } from '../../api';
import './AccountList.css';

const AccountList: React.FC = () => {
    const [accounts, setAccounts] = useState<AccountResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                
                const response = await getUserAccounts(token);
                setAccounts(response.accounts);
            } catch (err) {
                setError('Failed to fetch accounts');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    if (loading) return <div>Loading accounts...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <section className="accounts-section">
            <h2>Your Accounts</h2>
            <table className="accounts-table">
                <thead>
                    <tr>
                        <th>Account Type</th>
                        <th>Account Number</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.accountNumber}>
                            <td>Checking</td>
                            <td>****{account.accountNumber.slice(-4)}</td>
                            <td className="balance">${account.balance.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AccountList;