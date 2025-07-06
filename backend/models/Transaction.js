// backend/models/Transaction.js

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
  type: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative'],
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    trim: true,
    default: '',
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
