import React, { useContext, useEffect } from 'react';
import { fetchReports } from '../../api/reports';
import FetchWrapper from '../../components/FetchWrapper';
import { DONE_FETCHING_REPORTS, ERROR_FETCHING_REPORTS, FETCH_REPORTS } from '../../constants/actions';
import { AppStateContext } from '../../contexts/AppStateContextProvider';
import AddReport from './AddReport';
import Report from './Report';

const Reports = () => {
  const { dispatch, state: { fetchingReports, reports, errorFetchingReports } } = useContext(AppStateContext);
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
  }, [dispatch]);
  return (<div className="w-full p-8">
    <h1 className="mb-6 font-bolder text-xl">Reports</h1>
    <AddReport />
    <FetchWrapper fetching={fetchingReports} error={errorFetchingReports}>
      <div className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          {Object.values(reports).map((report) => <Report key={report.id} report={report} />)}
        </div>
      </div>
    </FetchWrapper>
  </div>);
};

export default Reports;
