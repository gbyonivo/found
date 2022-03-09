import foundAxios from './foundAxois';

const fetchReports = () => foundAxios.get('/reports');

const fetchReport = (id) => foundAxios.get(`/reports/${id}`);

const createReport = (report) => foundAxios.post('/reports', report);

const createClaim = (claim) => foundAxios.post('/claims', claim);

const fetchClaims = (reportId) => foundAxios.get(`/reports/${reportId}/claims`);

const answerClaim = ({ reportId, claimId, status }) => foundAxios.post(
  `/reports/${reportId}/answer`, { claimId, status });

export {
  fetchReports,
  createReport,
  fetchReport,
  createClaim,
  fetchClaims,
  answerClaim,
};
