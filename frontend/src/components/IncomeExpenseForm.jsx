/*import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/api';

const IncomeExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: '', type: 'Expense', category: '', date: '', note: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    const res = await axios.post('https://financetracker-sand.vercel.app/api/transactions', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onAdd(res.data);
    setForm({ amount: '', type: 'Expense', category: '', date: '', note: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a Transaction</h3>
      <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required />
      <select name="type" value={form.type} onChange={handleChange}>
        <option>Income</option>
        <option>Expense</option>
      </select>
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="note" value={form.note} onChange={handleChange} placeholder="Note (optional)" />
      <button type="submit">+ Add Entry</button>
    </form>
  );
};

export default IncomeExpenseForm;*/


import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/api';

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Income",
  "Other"
];

const IncomeExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: '',
    type: 'Expense',
    category: '',
    date: '',
    note: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleTypeChange = (value) => setForm({ ...form, type: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    const res = await axios.post('https://financetracker-sand.vercel.app/api/transactions', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onAdd(res.data);
    setForm({ amount: '', type: 'Expense', category: '', date: '', note: '' });
  };

  return (
    <>
      <style>{`
        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 420px;
          margin: 36px auto 0 auto;
          padding: 24px 18px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          font-family: sans-serif;
        }

        .form h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #222;
          text-align: left;
        }

        .radio-group {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
        }

        .radio-option.income label {
          color: #16a34a;
          font-weight: 600;
        }

        .radio-option.expense label {
          color: #dc2626;
          font-weight: 600;
        }

        .form input,
        .form select {
          padding: 10px 12px;
          font-size: 15px;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }

        .form input:focus,
        .form select:focus {
          border-color: #2563eb;
        }

        .form button {
          padding: 12px;
          font-weight: 600;
          background-color: #2563eb;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
        }

        .form button:hover {
          background-color: #174ea6;
        }
      `}</style>

      <form className="form" onSubmit={handleSubmit}>
        <h3 style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'20px',color:'#2563eb',fontWeight:700}}>+</span> Add Transaction
        </h3>
        <div className="radio-group">
          <div className="radio-option income">
            <input
              type="radio"
              name="type"
              value="Income"
              checked={form.type === 'Income'}
              onChange={() => handleTypeChange('Income')}
              id="income"
              style={{ accentColor: '#16a34a' }}
            />
            <label htmlFor="income">Income</label>
          </div>
          <div className="radio-option expense">
            <input
              type="radio"
              name="type"
              value="Expense"
              checked={form.type === 'Expense'}
              onChange={() => handleTypeChange('Expense')}
              id="expense"
              style={{ accentColor: '#dc2626' }}
            />
            <label htmlFor="expense">Expense</label>
          </div>
        </div>

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          step="0.01"
          min="0"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Note (optional)"
        />

        <button type="submit">+ Add Entry</button>
      </form>
    </>
  );
};

export default IncomeExpenseForm;
