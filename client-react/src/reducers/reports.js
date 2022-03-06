import {
  DONE_FETCHING_REPORTS,
  ERROR_FETCHING_REPORTS,
  FETCH_REPORTS,
  ERROR_ADDING_REPORT,
  ADD_REPORT,
  DONE_ADDING_REPORT,
  FETCH_REPORT,
  ERROR_FETCHING_REPORT,
  DONE_FETCHING_REPORT
} from '../constants/actions';

export const initialState = {
  reports: [],
  errorFetchingReports: null,
  fetchingReports: false,
  addingReport: false,
  errorAddingReport: null,
  fetchingSelectedReport: false,
  errorFetchingSelectedReport: null,
  selectedReport: null,
};

const handlers = {
  [FETCH_REPORT]: (state) => ({
    ...state,
    errorFetchingSelectedReport: null,
    selectedReport: null,
    fetchingSelectedReport: true,
  }),
  [ERROR_FETCHING_REPORT]: (state, { error }) => ({
    ...state,
    errorFetchingSelectedReport: error,
    fetchingSelectedReport: false,
  }),
  [DONE_FETCHING_REPORT]: (state, { report }) => ({
    ...state,
    fetchingSelectedReport: false,
    selectedReport: report,
    reports: {
      ...state.reports,
      [report.id]: report
    }
  }),
  [FETCH_REPORTS]: (state) => ({
    ...state,
    errorFetchingReports: null,
    fetchingReports: true,
  }),
  [ERROR_FETCHING_REPORTS]: (state, { error }) => ({
    ...state,
    errorFetchingReports: error,
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
