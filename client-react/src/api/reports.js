import foundAxios from './foundAxois';

const fetchReports = () => foundAxios.get('/reports');

const fetchReport = (id) => foundAxios.get(`/reports/${id}`);

const createReport = (report) => foundAxios.post('/reports', report);

export {
  fetchReports,
  createReport,
  fetchReport,
};
