import { Router } from 'express';
import {
  createAccount, deleteMyAccount, getAccount, getAccounts, getMyAccount, updateMyAccount,
} from '../controllers/account.js';
import { authenticateToken } from '../controllers/login.js';

const router = Router();

router.get('/', getAccounts);

router.post('/', createAccount);

router.get('/my-account', authenticateToken, getMyAccount);

router.delete('/my-account', authenticateToken, deleteMyAccount);

router.put('/my-account', authenticateToken, updateMyAccount);

router.get('/:id', getAccount);

export default router;
