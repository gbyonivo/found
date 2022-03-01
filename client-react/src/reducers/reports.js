import { DONE_FETCHING_REPORTS, ERROR_FETCHING_REPORTS, FETCH_REPORTS } from "../constants/actions";

export const initialState = {
  reports: [],
  errorFetchingReports: null,
  fetchingReports: false,
};

const handlers = {
  [FETCH_REPORTS]: (state) => ({
    ...state,
    errorFetchingReports: null,
    fetchingReports: true,
  }),
  [ERROR_FETCHING_REPORTS]: (state, { error: errorFetchingReports }) => ({
    ...state,
    errorFetchingReports,
    fetchingReports: false,
  }),
  [DONE_FETCHING_REPORTS]: (state = initialState, { reports }) => ({
    ...state,
    reports: reports.reduce((acc, curr) => ({
      ...acc,
      [curr.id]: curr,
    }), {}),
    fetchingReports: false,
  })
};

const reportsReducer = (state, { type, payload }) => {
  const handler = handlers[type];
  return handler ? handler(state, payload) : state;
};

export default reportsReducer;
