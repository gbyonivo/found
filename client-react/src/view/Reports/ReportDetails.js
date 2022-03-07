import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppStateContextProvider';
import Spinner from '../../components/Spinner';
import { UserContext } from '../../contexts/UserContextProvider';
import Claims from './Claims';
import YourClaims from './YourClaims';
import useReportAndClaims from '../../hooks/useReportAndClaims';
import ErrorView from '../../components/ErrorView';

const ReportDetails = () => {
  const { id } = useParams();
  const {
    state: {
      reports,
      selectedReport,
      fetchingSelectedReport,
      fetchingClaims,
      errorFetchingClaims,
      errorFetchingSelectedReport
    },
    dispatch
  } = useContext(AppStateContext);

  const { user } = useContext(UserContext);
  const existingReport = reports[id];
  useReportAndClaims({ existingReport, dispatch, id });
  if (fetchingSelectedReport || !selectedReport || fetchingClaims) return <Spinner />
  if (errorFetchingClaims || errorFetchingSelectedReport) return <ErrorView error={errorFetchingClaims || errorFetchingSelectedReport} />
  return (<div className='p-8'>
    <h1 className="text-xl">{selectedReport.itemName}</h1>
    {
      user.id !== selectedReport.accountId
        ? <YourClaims />
        : <Claims />
    }
  </div>)
};

export default ReportDetails;
