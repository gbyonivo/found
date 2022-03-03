import foundAxios from './foundAxois';

const fetchReports = () => foundAxios.get('/reports');

const createReport = (report) => foundAxios.post('/reports', report);

export {
  fetchReports,
  createReport,
};
