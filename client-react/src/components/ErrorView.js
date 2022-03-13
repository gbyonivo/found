import PropTypes from 'prop-types';
import React from 'react';

function ErrorView() {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative h-16"
      role="alert"
    >
      <strong className="font-bold">Holy smokes! </strong>
      <span className="block sm:inline">Something seriously bad happened.</span>
    </div>
  )
}

ErrorView.defaultProps = {
  error: '',
};

ErrorView.propTypes = {
  error: PropTypes.string, // eslint-disable-line
};

export default ErrorView;
