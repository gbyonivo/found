import { Router } from 'express';
import { getReportClaims } from '../controllers/claimService.js';
import { createReport, getReport, getReports } from '../controllers/report.js';

const router = Router();

router.use((req, res, next) => {
  next();
});

router.get('/:id', getReport);

router.get('/', getReports);

router.post('/', createReport);

// claims
router.get('/:id/claims', getReportClaims);

export default router;
