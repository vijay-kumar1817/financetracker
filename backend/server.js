// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import transactionRoutes from './routes/transactions.js';
import userRoutes from './routes/users.js';


dotenv.config();
connectDB();

const app = express();

<<<<<<< HEAD
app.use(cors());
=======





app.use(cors({
  origin: 'https://financetracker-p6rg.vercel.app'|| 'http://localhost:5173',
  credentials: true, // Optional: if you are using cookies or authentication
}));
>>>>>>> c5b456abf1c986adaaea592eb12b6c64ebc2be15
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// backend/server.js
