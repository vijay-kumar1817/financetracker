// backend/controllers/uploadController.js
import { parsePDF } from '../utils/pdfParser.js';

export const parsePDFTransactions = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const transactions = await parsePDF(req.file.buffer);
    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to parse PDF' });
  }
};
