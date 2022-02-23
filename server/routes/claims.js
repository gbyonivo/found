import { Router } from 'express';
import { createClaim, getClaim } from '../controllers/claim.js';
import { authenticateToken } from '../controllers/login.js';

const router = Router();

router.use(authenticateToken);

router.post('/', createClaim);

router.get('/:id', getClaim);

export default router;
