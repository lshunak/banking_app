// src/components/Transaction/TransactionItem.tsx
import React from 'react';

export type TransactionItemProps = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
};

const TransactionItem: React.FC<TransactionItemProps> = ({ date, description, amount, type }) => {
  return (
    <div className="transaction-item">
      <span className="transaction-date">{date}</span>
      <span className="transaction-description">{description}</span>
      <span className={`transaction-amount ${type}`}>
        {type === 'debit' ? '-' : '+'}${amount.toFixed(2)}
      </span>
    </div>
  );
};

export default TransactionItem;