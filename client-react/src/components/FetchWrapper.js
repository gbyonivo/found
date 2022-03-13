import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import ErrorView from './ErrorView';

function FetchWrapper({ fetching, error, children }) {
  if (fetching) return <Spinner />
  if (error) return <div className="m-8"><ErrorView /></div>

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{ children }</>
}

FetchWrapper.defaultProps = {
  error: '',
};

FetchWrapper.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FetchWrapper;
