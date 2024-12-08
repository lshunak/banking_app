// src/components/Transaction/TransactionList.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTransactions, Transaction } from '../../api';
import TransactionItem from './TransactionItem';
import './TransactionList.css';

type TransactionListProps = {
  accountNumber?: string;
};

const TransactionList: React.FC<TransactionListProps> = ({ accountNumber }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!accountNumber) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const data = await getTransactions(token, accountNumber);
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accountNumber]);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="transactions-section">
      <h2>Recent Transactions {accountNumber && `for ****${accountNumber.slice(-4)}`}</h2>
      <div className="transaction-list">
        {transactions.map(transaction => (
          <TransactionItem
            key={transaction.userId}
            id={transaction.userId}
            date={new Date().toISOString()} // Assuming transaction date would come from API
            description={`${transaction.senderAccount} → ${transaction.receiverAccount}`}
            amount={transaction.amount}
            type={transaction.senderAccount === accountNumber ? 'debit' : 'credit'}
          />
        ))}
      </div>
    </section>
  );
};

export default TransactionList;