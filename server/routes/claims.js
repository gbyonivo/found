import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

router.post('/:id', (req, res) => {
  res.send('create claim');
});

router.put('/:id', (req, res) => {
  res.send('update claim');
});

export default router;
