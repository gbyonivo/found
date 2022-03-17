import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connection } from './src/db/connect.js'; // eslint-disable-line
import account from './src/routes/accounts.js';
import claims from './src/routes/claims.js';
import reports from './src/routes/reports.js';
import login from './src/routes/login.js';

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
