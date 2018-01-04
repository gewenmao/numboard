import React from 'react';
import PropTypes from 'prop-types';

const nill = () => false;

const KeyButton = ({ value, style = {}, disabled = false, className = '', onClick = nill }) => (
  <input
    type="button"
    className={className ? `nb-key ${className}` : 'nb-key'}
    value={value}
    style={style}
    onClick={onClick}
    disabled={disabled}
  />
);

KeyButton.defaultProps = {
  value: '',
  style: {},
  disabled: false,
  className: '',
  onClick: nill,
};

KeyButton.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};


export default KeyButton;
