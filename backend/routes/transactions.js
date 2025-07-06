// backend/routes/transactions.js
import express from 'express';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
import Transaction from '../models/Transaction.js'; //
router.get('/', protect, getTransactions);
router.post('/', protect, createTransaction);
router.put('/:id', protect, updateTransaction);
router.delete('/:id', protect, deleteTransaction);
// File: routes/transactions.js

router.post('/bulk', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionsWithUser = req.body.transactions.map((tx) => ({
      ...tx,
      user: userId,
    }));

    const saved = await Transaction.insertMany(transactionsWithUser);
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save transactions' });
  }
});

export default router;
