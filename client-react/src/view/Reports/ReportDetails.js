import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppStateContextProvider';
import { fetchReport } from '../../api/reports';
import { DONE_FETCHING_REPORT, ERROR_FETCHING_REPORT, FETCH_REPORT } from '../../constants/actions';
import Spinner from '../../components/Spinner';

const ReportDetails = () => {
  const { id } = useParams();
  const { state: { reports, selectedReport, fetchingSelectedReport }, dispatch } = useContext(AppStateContext);
  const existingReport = reports[id];
  useEffect(() => {
    if (existingReport) {
      dispatch({ type: DONE_FETCHING_REPORT, payload: { report: existingReport } })
      return;
    } 
    const getReport = async () => {
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
  if (fetchingSelectedReport || !selectedReport) return <Spinner />
  return (<div className='p-8'>
    <h1 className="text-xl">{selectedReport.itemName}</h1>
  </div>)
};

export default ReportDetails;
