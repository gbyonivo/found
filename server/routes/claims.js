import { Router } from 'express';
import { createClaim, getClaim } from '../controllers/claim.js';

const router = Router();

router.use((req, res, next) => {
  next();
});

router.post('/', createClaim);

router.get('/:id', getClaim);

export default router;
