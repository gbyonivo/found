import express from 'express';
import dotenv from 'dotenv';
import account from './routes/accounts.js';
import claims from './routes/claims.js';
import reports from './routes/reports.js';

dotenv.config({ path: './config/config.env' });

const app = express();
app.use('/accounts', account);
app.use('/claims', claims);
app.use('/reports', reports);
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in development on port ${PORT}`));