import { Router } from 'express';
import { login } from '../controllers/login.js';

const router = Router();

router.use((req, res, next) => {
  next();
});

router.post('/', login);

export default router;
