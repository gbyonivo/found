import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

router.get('/:id', (req, res) => {
  res.send('return report');
});

router.get('/', (req, res) => {
  res.send('return all reports');
});

router.post('/', (req, res) => {
  res.send('create report');
});

router.delete('/:id', (req, res) => {
  res.send('delete report');
});

// claims
router.get('/:id/claims', (req, res) => {
  res.send('return claims');
});

export default router;