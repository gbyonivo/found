import {
  DONE_FETCHING_REPORTS,
  ERROR_FETCHING_REPORTS,
  FETCH_REPORTS,
  ERROR_ADDING_REPORT,
  ADD_REPORT,
  DONE_ADDING_REPORT,
  FETCH_REPORT,
  ERROR_FETCHING_REPORT,
  DONE_FETCHING_REPORT,
  ADD_CLAIM,
  DONE_ADDING_CLAIM,
  ERROR_ADDING_CLAIM,
  FETCH_CLAIMS,
  DONE_FETCHING_CLAIMS,
  ERROR_FETCHING_CLAIMS,
  ANSWER_CLAIM,
  DONE_ANSWERING_CLAIM,
  ERROR_ANSWERING_CLAIM,
} from '../constants/actions';
import { statusses } from '../constants/common';

const createNewStatus = (claimId, status, curr) => {
  if (claimId === curr.id) return status;
  if (status === statusses.APPROVED.value) return statusses.DENIED.value;
  return curr.status;
};

export const initialState = {
  reports: [],
  errorFetchingReports: null,
  fetchingReports: false,
  addingReport: false,
  errorAddingReport: null,
  fetchingSelectedReport: false,
  errorFetchingSelectedReport: null,
  selectedReport: null,
  claims: {},
  fetchingClaims: false,
  errorFetchingClaims: null,
  answeringClaim: false,
  errorAnsweringClaim: null,
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
      [report.id]: report,
    },
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
  [DONE_ADDING_REPORT]: (state, { report }) => ({
    ...state,
    addingReport: false,
    reports: { ...state.reports, [report.id]: report },
  }),
  [ERROR_ADDING_REPORT]: (state, { error }) => ({
    ...state,
    addingReport: false,
    errorAddingReport: error,
  }),
  [ADD_CLAIM]: (state) => ({
    ...state,
    addingClaim: true,
    errorAddingClaim: null,
  }),
  [DONE_ADDING_CLAIM]: (state, { claim }) => ({
    ...state,
    addingClaim: false,
    claims: {
      ...state.claims,
      [claim.reportId]: {
        ...(state.claims[claim.reportId] || {}),
        [claim.id]: claim,
      },
    },
  }),
  [ERROR_ADDING_CLAIM]: (state, { error }) => ({
    ...state,
    addingClaim: false,
    errorAddingClaim: error,
  }),
  [FETCH_CLAIMS]: (state) => ({
    ...state,
    fetchingClaims: true,
  }),
  [DONE_FETCHING_CLAIMS]: (state, { claims }) => ({
    ...state,
    claims: {
      ...state.claims,
      ...claims.reduce((acc, curr) => ({
        ...acc,
        [curr.reportId]: {
          ...(acc[curr.reportId] || {}),
          [curr.id]: curr,
        },
      }), {}),
    },
    fetchingClaims: false,
  }),
  [ERROR_FETCHING_CLAIMS]: (state, { error }) => ({
    ...state,
    errorFetchingClaims: error,
    fetchingClaims: false,
  }),
  [ANSWER_CLAIM]: (state) => ({
    ...state,
    answeringClaim: true,
    errorAnsweringClaim: null,
  }),
  [DONE_ANSWERING_CLAIM]: (state, { status, claimId, reportId }) => ({
    ...state,
    claims: {
      ...state.claims,
      [reportId]: Object.values(state.claims[reportId]).reduce((acc, curr) => ({
        ...acc,
        [curr.id]: {
          ...curr,
          status: createNewStatus(claimId, status, curr),
        },
      }), {}),
    },
    answeringClaim: false,
  }),
  [ERROR_ANSWERING_CLAIM]: (state, { error }) => ({
    ...state,
    answeringClaim: false,
    errorAnsweringClaim: error,
  }),
};

const reportsReducer = (state, { type, payload }) => {
  const handler = handlers[type];
  return handler ? handler(state, payload) : state;
};

export default reportsReducer;
