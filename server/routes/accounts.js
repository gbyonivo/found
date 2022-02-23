import { Router } from 'express';
import { createAccount } from '../controllers/account.js';

const router = Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

router.get('/:id', (req, res) => {
  res.send('hey kuma');
});

router.put('/:id', (req, res) => {
  res.send('update user');
});

router.post('/', createAccount);

router.delete('/', (req, res) => {
  res.send('delete my account');
});

export default router;