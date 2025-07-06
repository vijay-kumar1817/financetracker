import React from 'react';

const SmartInsights = ({ income, expenses }) => {
  const diff = income - expenses;

  return (
    <>
      <style>{`
        .insights {
          background: #f3f4f6;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          max-width: 500px;
          margin: 20px auto;
          font-family: sans-serif;
        }

        .insights h3 {
          margin-bottom: 10px;
          color: #2563eb;
          font-size: 18px;
        }

        .insights ul {
          padding-left: 20px;
        }

        .insights li {
          margin-bottom: 8px;
          font-size: 14px;
          color: #374151;
        }

        .insights li:first-child {
          font-weight: 600;
          color: green;
        }
      `}</style>

      <div className="insights">
        <h3>Smart Insights</h3>
        <ul>
          <li>You saved ₹{diff > 0 ? diff : 0} this month.</li>
          <li>Try reducing expenses in high-spending categories.</li>
        </ul>
      </div>
    </>
  );
};

export default SmartInsights;


