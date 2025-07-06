// File: src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IncomeExpenseForm from '../components/IncomeExpenseForm';
import TransactionsTable from '../components/TransactionsTable';
import SummaryCards from '../components/SummaryCards';
import ExpenseChart from '../components/ExpenseChart';
import GoalTracker from '../components/GoalTracker';
import SmartInsights from '../components/SmartInsights';
import UploadPDF from '../components/UploadPDF';
import UploadReceipt from '../components/UploadReceipt';
import { getToken } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [goal, setGoal] = useState(10000);
  const [timeRange, setTimeRange] = useState('All');
  const [activePage, setActivePage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://financetracker-sand.vercel.app/api/transactions', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setTransactions(res.data);
    };
    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    if (timeRange === 'All') return true;
    const txDate = new Date(tx.date);
    const now = new Date();
    const rangeDays = parseInt(timeRange);
    return (now - txDate) / (1000 * 60 * 60 * 24) <= rangeDays;
  });

  const income = filteredTransactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = filteredTransactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const progress = goal - expenses;

  const categoryTotals = filteredTransactions.reduce((acc, tx) => {
    if (tx.type === 'Expense') {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    }
    return acc;
  }, {});

  const dailyExpenses = filteredTransactions.reduce((acc, tx) => {
    if (tx.type === 'Expense') {
      const date = new Date(tx.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + tx.amount;
    }
    return acc;
  }, {});

  const handleAddTransaction = (tx) => {
    setTransactions((prev) => [...prev, tx]);
  };

  const handleBulkUpload = (newTxs) => {
    setTransactions((prev) => [...prev, ...newTxs]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTransactions([]);
    setGoal(0);
    setTimeRange('All');
    setActivePage('home');
    // Don't navigate to login, stay on dashboard
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: #4e54c8;
          z-index: 1000;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 16px;
          min-height: 56px;
        }

        .header-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .title {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
        }

        .subtitle {
          font-size: 12px;
          color: #e0e0e0;
        }

        .nav-buttons {
          display: flex;
          gap: 12px;
        }

        .nav-link {
          text-decoration: none;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: #fff;
          color: #4e54c8;
        }

        .logout-btn {
          margin-left: 18px;
          background: #ef4444;
          color: #fff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: #b91c1c;
        }

        .login-btn, .register-btn {
          margin-left: 12px;
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-btn:hover, .register-btn:hover {
          background: #1e40af;
        }

        .main-content {
          padding-top: 70px;
          padding: 18px 8px 8px 8px;
          width:100vw;
        }

        .uploads-section,
        .uploads-section {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          min-height: 70vh;
          width: 100%;
          justify-content: center;
          align-items: center;
          background: url('../public/assests/fin3.jpg') center center/cover no-repeat;
          border-radius: 24px;
          box-shadow: 0 2px 24px 0 rgba(78,84,200,0.08);
          position: relative;
        }
        .uploads-section > * {
          flex: 1 1 320px;
          min-width: 320px;
          max-width: 420px;
          padding: 32px 24px 24px 24px;
          background: rgba(255,255,255,0.82);
          border-radius: 18px;
          box-shadow: 0 2px 12px 0 rgba(78,84,200,0.07);
          border: 1px solid #e0e4fa;
          transition: box-shadow 0.2s;
        }
        .uploads-section > *:hover {
          box-shadow: 0 4px 24px 0 rgba(78,84,200,0.13);
        }
        .charts-section {
          display: flex;
          flex-direction: row;
          gap: 0;
          width: 100%;
          min-height: 320px;
          background: #f8fafc;
          border-radius: 18px;
          box-shadow: 0 2px 12px 0 rgba(78,84,200,0.07);
          border: 1px solid #e0e4fa;
          margin-bottom: 2rem;
          overflow-x: auto;
          overflow-y: hidden;
        }
        .chart-graph {
          flex: 0 0 65%;
          max-width: 65%;
          width: 65%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          padding: 2rem 1.5rem 2rem 2rem;
          box-shadow: none;
          border: none;
          min-width: 0;
          overflow: hidden;
        }
        .chart-insights {
          flex: 0 0 35%;
          max-width: 35%;
          width: 35%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background: transparent;
          padding: 2rem 1rem 2rem 1.5rem;
          box-shadow: none;
          border: none;
          margin-top: 2.5rem;
          min-width: 0;
        }
        .chart-graph > * {
          width: 90% !important;
          height: 90% !important;
          max-width: 500px;
          margin: auto;
          box-sizing: border-box;
        }
        .charts-section .category-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
          margin-bottom: 0;
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 8px;
        }
        .charts-section .category-legend span {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
        }
        .charts-section .category-legend .legend-circle {
          width: 12px;
          height: 16px;
          border-radius: 50%;
          display: inline-block;
        }

        .nav-link.disabled {
          cursor: not-allowed;
          background: none;
          color: #a5b4fc;
          opacity: 0.5;
        }
      `}</style>

     
      <div className="navbar">
        <div className="header-text">
          <div className="title">Personal Finance Assistant</div>
          <div className="subtitle">
            Track, manage, and understand your financial activities effortlessly.
          </div>
        </div>

        <div className="nav-buttons">
          <div
            className={`nav-link${activePage === 'home' ? ' active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            Home
          </div>
          {isLoggedIn ? (
            <>
              {['form','uploads','charts','transactions'].map((page) => (
                <div
                  key={page}
                  className={`nav-link${activePage === page ? ' active' : ''}`}
                  onClick={() => setActivePage(page)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </div>
              ))}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {['form','uploads','charts','transactions'].map((page) => (
                <div
                  key={page}
                  className="nav-link disabled"
                  style={{ pointerEvents: 'none', opacity: 0.5 }}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </div>
              ))}
              <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
              <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </div>

   
      <div className="main-content">
        {activePage === 'home' && (
          <>
            <SummaryCards income={income} expenses={expenses} />
            <GoalTracker goal={goal} progress={progress} />
          </>
        )}

        {isLoggedIn && activePage === 'form' && (
          <IncomeExpenseForm onAdd={handleAddTransaction} />
        )}

        {isLoggedIn && activePage === 'uploads' && (
          <div className="uploads-section">
            <UploadReceipt onUploadTransaction={handleBulkUpload} />
            <UploadPDF onUpload={handleBulkUpload} />
          </div>
        )}

        {isLoggedIn && activePage === 'charts' && (
          <div className="charts-section">
            <div className="chart-graph">
              <ExpenseChart
                categoryTotals={categoryTotals}
                dailyExpenses={dailyExpenses}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
              />
            </div>
            <div className="chart-insights">
              <SmartInsights income={income} expenses={expenses} />
            </div>
          </div>
        )}

        {isLoggedIn && activePage === 'transactions' && (
          <TransactionsTable transactions={filteredTransactions} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
