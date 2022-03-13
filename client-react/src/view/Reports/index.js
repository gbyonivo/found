import React, { useContext, useEffect } from 'react';
import { fetchReports } from '../../api/reports';
import FetchWrapper from '../../components/FetchWrapper';
import { DONE_FETCHING_REPORTS, ERROR_FETCHING_REPORTS, FETCH_REPORTS } from '../../constants/actions';
import { AppStateContext } from '../../contexts/AppStateContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';
import { sortByProperty } from '../../functions/common';
import AddReport from './AddReport';
import Report from './Report';

function Reports() {
  const {
    dispatch,
    state: { fetchingReports, reports, errorFetchingReports },
  } = useContext(AppStateContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getReports = async () => {
      dispatch({ type: FETCH_REPORTS })
      try {
        const { data } = await fetchReports();
        dispatch({ type: DONE_FETCHING_REPORTS, payload: { reports: data } })
      } catch (e) {
        dispatch({ type: ERROR_FETCHING_REPORTS, payload: { error: e } });
      }
    }
    getReports();
  }, [dispatch]);
  return (
    <div className="w-full p-8">
      <h1 className="mb-6 font-bolder text-xl">Reports</h1>
      <AddReport />
      <FetchWrapper fetching={fetchingReports} error={errorFetchingReports}>
        <div className="mt-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            {sortByProperty(Object.values(reports), 'createdAt').map((report) => (
              <Report
                key={report.id}
                report={report}
                allowedToClaim={report.accountId !== user.id}
              />
            ))}
          </div>
        </div>
      </FetchWrapper>
    </div>
  );
}

export default Reports;
