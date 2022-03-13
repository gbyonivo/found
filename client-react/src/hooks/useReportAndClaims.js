import { useCallback, useEffect } from 'react';
import { answerClaim, fetchClaims, fetchReport } from '../api/reports';
import {
  DONE_FETCHING_REPORT,
  ERROR_FETCHING_REPORT,
  FETCH_REPORT,
  FETCH_CLAIMS,
  DONE_FETCHING_CLAIMS,
  ERROR_FETCHING_CLAIMS,
  ANSWER_CLAIM,
  DONE_ANSWERING_CLAIM,
  ERROR_ANSWERING_CLAIM,
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
      try {
        const { data } = await fetchClaims(id);
        dispatch({ type: DONE_FETCHING_CLAIMS, payload: { claims: data } });
      } catch (e) {
        dispatch({ type: ERROR_FETCHING_CLAIMS, payload: { error: 'data' } });
      }
    };
    getClaims();
  }, [id, dispatch])

  const answer = useCallback((sts, claimId) => {
    const handleClick = async () => {
      dispatch({ type: ANSWER_CLAIM });
      try {
        await answerClaim({ reportId: id, claimId, status: sts });
        dispatch({ type: DONE_ANSWERING_CLAIM, payload: { reportId: id, claimId, status: sts } });
      } catch (e) {
        dispatch({ type: ERROR_ANSWERING_CLAIM, payload: { error: 'Error answering claim' } })
      }
    }
    handleClick();
  }, [dispatch, id]);

  return answer;
};

export default useReportAndClaims;
