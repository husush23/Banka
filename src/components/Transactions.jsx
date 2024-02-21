// TransactionList.jsx
import React from 'react';

const TransactionList = ({transactions}) => (
  <div className='mt-5 w-100'>
    <h2 className='mb-4 text-center'>Transactions</h2>
    {transactions.map((transaction, index) => (
      <div
        key={index}
        className={`card mb-3 ${
          transaction.type === 'deposit' ? 'text-success' : 'text-danger'
        }`}
      >
        <div className='card-body'>
          <h5 className='card-title'>
            {transaction.type.toUpperCase()} - {transaction.amount}
          </h5>
          <p className='card-text'>
            Date: {new Date(transaction.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default TransactionList;
