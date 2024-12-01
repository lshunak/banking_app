import React from 'react';

export type AccountCardProps = {
  accountNumber: string;
  balance: number;
  type?: 'checking' | 'savings';
};

export const AccountCard: React.FC<AccountCardProps> = ({ accountNumber, balance, type = 'checking' }) => {
  return (
    <div className="account-card">
      <div className="account-type">{type}</div>
      <div className="account-number">****{accountNumber.slice(-4)}</div>
      <div className="balance">${balance.toFixed(2)}</div>
    </div>
  );
};
