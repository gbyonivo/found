import foundAxios from './foundAxois';

const fetchReports = () => foundAxios.get('/reports');

export {
  fetchReports,
};
