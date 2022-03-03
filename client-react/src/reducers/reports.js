import {
  DONE_FETCHING_REPORTS,
  ERROR_FETCHING_REPORTS,
  FETCH_REPORTS,
  ERROR_ADDING_REPORT,
  ADD_REPORT,
  DONE_ADDING_REPORT
} from '../constants/actions';

export const initialState = {
  reports: [],
  errorFetchingReports: null,
  fetchingReports: false,
  addingReport: false,
  errorAddingReport: null,
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
  [DONE_FETCHING_REPORTS]: (state, { reports }) => ({
    ...state,
    reports: reports.reduce((acc, curr) => ({
      ...acc,
      [curr.id]: curr,
    }), {}),
    fetchingReports: false,
  }),
  [ADD_REPORT]: (state) => ({
    ...state,
    addingReport: true,
    errorAddingReport: null,
  }),
  [DONE_ADDING_REPORT]: (state, { report }) => {
    return {
      ...state,
      addingReport: false,
      reports: { ...state.reports, [report.id]: report },
    }
  },
  [ERROR_ADDING_REPORT]: (state, { error }) => ({
    ...state,
    addingReport: false,
    errorAddingReport: error,
  }),
};

const reportsReducer = (state = initialState, { type, payload }) => {
  const handler = handlers[type];
  return handler ? handler(state, payload) : state;
};

export default reportsReducer;
