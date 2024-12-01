// src/components/Transaction/TransactionList.tsx
import React from 'react';
import TransactionItem, { TransactionItemProps } from './TransactionItem';

type TransactionListProps = {
  accountNumber?: string;
};

const mockTransactions: TransactionItemProps[] = [
  {
    id: '1',
    date: '2024-03-20',
    description: 'Deposit',
    amount: 1000,
    type: 'credit'
  },
  {
    id: '2',
    date: '2024-03-19',
    description: 'Withdrawal',
    amount: 50,
    type: 'debit'
  }
];

const TransactionList: React.FC<TransactionListProps> = ({ accountNumber }) => {
  return (
    <section className="transactions-section">
      <h2>Recent Transactions {accountNumber && `for ****${accountNumber.slice(-4)}`}</h2>
      <div className="transaction-list">
        {mockTransactions.map(transaction => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </section>
  );
};

export default TransactionList;