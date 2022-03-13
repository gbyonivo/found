import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import ErrorView from './ErrorView';

const FetchWrapper = ({ fetching, error, children }) => {
  if (fetching) return <Spinner />
  if (error) return <div className="m-8"><ErrorView /></div>

  return <>{children}</>
};

FetchWrapper.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.any,
  children: PropTypes.any.isRequired
};

export default FetchWrapper;