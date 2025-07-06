// backend/routes/upload.js
import express from 'express';
import multer from 'multer';
import { parsePDFTransactions } from '../controllers/uploadController.js';

const router = express.Router();
const upload = multer(); // Memory storage

router.post('/pdf', upload.single('file'), parsePDFTransactions);

export default router;
