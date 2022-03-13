import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppStateContextProvider';
import Spinner from '../../components/Spinner';
import { UserContext } from '../../contexts/UserContextProvider';
import useReportAndClaims from '../../hooks/useReportAndClaims';
import ErrorView from '../../components/ErrorView';
import Claim from './Claim';
import AddClaim from './AddClaim';
import { sortByProperty } from '../../functions/common';

const ReportDetails = () => {
  const { id } = useParams();
  const {
    state: {
      reports,
      selectedReport,
      fetchingSelectedReport,
      fetchingClaims,
      errorFetchingClaims,
      errorFetchingSelectedReport,
      claims
    },
    dispatch
  } = useContext(AppStateContext);

  const { user } = useContext(UserContext);
  const existingReport = reports[id];
  const answer = useReportAndClaims({ existingReport, dispatch, id });
  const claimsArr = sortByProperty(Object.values(claims[id] || {}), 'createdAt');
  if (fetchingSelectedReport || !selectedReport || fetchingClaims) return <Spinner />
  if (errorFetchingClaims || errorFetchingSelectedReport) return <ErrorView error={errorFetchingClaims || errorFetchingSelectedReport} />
  return (<div className='p-8 h-full flex flex-col'>
    <h1 className="text-xl mb-8">{selectedReport.itemName}</h1>
    {user.id !== selectedReport.accountId && <div className="mb-8"><AddClaim /></div>}
    <div className="flex-1 overflow-auto">
      {
        claimsArr.length === 0
        ? <div className="p-4 text-xl text-gray-400">
          No claims made.
        </div>
        : claimsArr.map((claim) => <Claim
          claim={claim}
          key={claim.id}
          answer={answer}
          showButtons={user.id === selectedReport.accountId}
        />)
      }
    </div>
  </div>)
};

export default ReportDetails;
