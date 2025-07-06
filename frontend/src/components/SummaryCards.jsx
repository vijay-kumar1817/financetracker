/*import React from 'react';

const SummaryCards = ({ income, expenses }) => {
  const balance = income - expenses;
  return (
    <div className="summary-cards">
      <div className="card">Income: ₹{income}</div>
      <div className="card">Expenses: ₹{expenses}</div>
      <div className="card">Balance: ₹{balance}</div>
    </div>
  );
};

export default SummaryCards;*/

import React from 'react';

const SummaryCards = ({ income, expenses }) => {
  const balance = income - expenses;

  return (
    <>
      <style>
        {`
          .summary-cards {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-top: 20px;
            flex-wrap: nowrap; /* force side-by-side */
          }

          .card {
            flex: 1;
            padding: 20px;
            border-radius: 12px;
            color: white;
            min-width: 200px;
            max-width: 100%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .card h2 {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .card .amount {
            font-size: 32px;
            font-weight: bold;
          }

          .card .note {
            font-size: 14px;
            margin-top: 5px;
          }

          .card.income {
            background: linear-gradient(to right, #16c96e, #0aad57);
          }

          .card.expenses {
            background: linear-gradient(to right, #f44336, #d32f2f);
          }

          .card.balance {
            background: linear-gradient(to right, #4285f4, #3367d6);
          }

          /* Optional: Prevent wrapping on smaller screens */
          @media (max-width: 768px) {
            .summary-cards {
              flex-direction: column;
            }
          }
        `}
      </style>

      <div className="summary-cards">
        <div className="card income">
          <h2>Total Income</h2>
          <p className="amount">₹{income.toLocaleString()}</p>
        </div>
        <div className="card expenses">
          <h2>Total Expenses</h2>
          <p className="amount">₹{expenses.toLocaleString()}</p>
        </div>
        <div className="card balance">
          <h2>Net Balance</h2>
          <p className="amount">₹{balance.toLocaleString()}</p>
          <p className="note">Available balance</p>
        </div>
      </div>
    </>
  );
};

export default SummaryCards;
