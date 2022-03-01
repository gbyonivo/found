import React, { useEffect, useReducer } from 'react';
import { fetchReports } from '../../api/reports';
import FetchWrapper from '../../components/FetchWrapper';
import { DONE_FETCHING_REPORTS, ERROR_FETCHING_REPORTS, FETCH_REPORTS } from '../../constants/actions';
import reportsReducer, { initialState } from '../../reducers/reports';
import Report from './Report';

const Reports = () => {
  const [{ fetchingReports, reports, errorFetchingReports }, dispatch] = useReducer(reportsReducer, initialState);
  useEffect(() => {
    const getReports = async () => {
      dispatch({ type: FETCH_REPORTS })
      try {
        const { data: reports } = await fetchReports();
        dispatch({ type: DONE_FETCHING_REPORTS, payload: { reports } })
      } catch (e) {
        dispatch({ type: ERROR_FETCHING_REPORTS, payload: { error: e } });
      }
    }
    getReports();
  }, []);
  console.log(reports);
  return (<FetchWrapper fetching={fetchingReports} error={errorFetchingReports}>
    <div className="mt-4 p-8 w-full">
      <h1 className="mb-6 font-light text-xl">Reports</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.values(reports).map((report) => <Report key={report.id} report={report} />)}
      </div>
    </div>;
  </FetchWrapper>);
};

export default Reports;
