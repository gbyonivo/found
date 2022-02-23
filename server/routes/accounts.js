import { Router } from 'express';
import { createAccount, getAccount, getAccounts } from '../controllers/account.js';
import { authenticateToken } from '../controllers/login.js';

const router = Router();

router.get('/:id', getAccount);

router.get('/', getAccounts);

router.post('/', createAccount);

router.delete('/my-account', authenticateToken, (req, res) => {
  res.send('delete my account');
});

router.put('/my-account', authenticateToken, (req, res) => {
  res.send('update user');
});

export default router;
