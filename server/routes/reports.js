import { Router } from 'express';
import { getReportClaims, answerClaim } from '../controllers/claim.js';
import { authenticateToken } from '../controllers/login.js';
import { createReport, getReport, getReports } from '../controllers/report.js';

const router = Router();

router.use(authenticateToken);

router.get('/:id', getReport);

router.get('/', getReports);

router.post('/', createReport);

// claims
router.get('/:id/claims', getReportClaims);

router.post('/:id/answer', answerClaim);

export default router;
