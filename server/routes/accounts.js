import { Router } from 'express';

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

router.post('/', (req, res) => {
  res.send('create user');
});

router.delete('/', (req, res) => {
  res.send('delete my account');
});

export default router;