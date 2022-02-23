import { Router } from 'express';
import { createAccount, getAccount, getAccounts } from '../controllers/account.js';

const router = Router();

router.use((req, res, next) => {
  next();
});

router.get('/:id', getAccount);

router.get('/', getAccounts);

router.post('/', createAccount);

router.delete('/my-account', (req, res) => {
  res.send('delete my account');
});

router.put('/my-account', (req, res) => {
  res.send('update user');
});

export default router;
