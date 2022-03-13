import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connection } from './db/connect.js'; // eslint-disable-line
import account from './routes/accounts.js';
import claims from './routes/claims.js';
import reports from './routes/reports.js';
import login from './routes/login.js';

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/accounts', account);
app.use('/claims', claims);
app.use('/reports', reports);
app.use('/login', login);
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in development on port ${PORT}`));
