// backend/controllers/transactionController.js
import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;
    const transaction = new Transaction({
      user: req.user.id, amount, type, category, date, note
    });
    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.deleteOne({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
};
