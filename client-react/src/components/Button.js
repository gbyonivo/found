import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const Button = ({ busy, disabled, value, onClick, className, colour }) => {
  const onClickButton = () => {
    if (busy || disabled) return;
    onClick();
  };

  const classNames = useMemo(() => `rounded h-10 text-sm py-1 px-2 text-center 
  min-w-32 text-white ${className} ${disabled ? 'not-allowed' : 'pointer'}`, [className, disabled]);


  return <button onClick={onClickButton} className={`${classNames} ${colour}`}>
    {value} {busy ? '...' : ''}
  </button>
};

Button.defaultProps = {
  busy: false,
  disabled: false,
  value: 'Submit',
  className: '',
  colour: 'bg-yellow-900'
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired
};

export default Button;
