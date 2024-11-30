// src/components/Account/AccountList.tsx
import React from 'react';
/* import { AccountCard } from './AccountCard'; */
import type { AccountCardProps } from './AccountCard';

const mockAccounts: AccountCardProps[] = [
    { accountNumber: '1234567890', balance: 5000, type: 'checking' },
    { accountNumber: '0987654321', balance: 10000, type: 'savings' }
];

const AccountList: React.FC = () => {
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
                    {mockAccounts.map(account => (
                        <tr key={account.accountNumber}>
                            <td>{account.type}</td>
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