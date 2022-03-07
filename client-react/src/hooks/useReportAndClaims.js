import { useEffect } from 'react';
import { fetchClaims, fetchReport } from '../api/reports';
import {
  DONE_FETCHING_REPORT,
  ERROR_FETCHING_REPORT,
  FETCH_REPORT,
  FETCH_CLAIMS,
  DONE_FETCHING_CLAIMS,
  ERROR_FETCHING_CLAIMS
} from '../constants/actions';

const useReportAndClaims = ({ existingReport, dispatch, id }) => {
  useEffect(() => {
    const getReport = async () => {
      if (existingReport) {
        dispatch({ type: DONE_FETCHING_REPORT, payload: { report: existingReport } })
        return;
      }
      dispatch({ type: FETCH_REPORT });
      try {
        const { data } = await fetchReport(id);
        dispatch({ type: DONE_FETCHING_REPORT, payload: { report: data } });
      } catch (e) {
        dispatch({ type: ERROR_FETCHING_REPORT, payload: { error: 'data' } });
      }
    }
    getReport();
  }, [id, dispatch, existingReport])

  useEffect(() => {
    const getClaims = async () => {
      dispatch({ type: FETCH_CLAIMS });
      console.log('here')
      try {
        console.log('here now')
        const { data } = await fetchClaims(id);
        console.log('here')
        dispatch({ type: DONE_FETCHING_CLAIMS, payload: { claims: data } });
      } catch (e) {
        console.log(e)
        dispatch({ type: ERROR_FETCHING_CLAIMS, payload: { error: 'data' } });
      }
    };
    getClaims();
  }, [id, dispatch])
};

export default useReportAndClaims;