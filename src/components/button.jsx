import React from 'react';
import PropTypes from 'prop-types';

const nill = () => false;

const KeyButton = ({
  value, style = {}, icon, disabled = false, className = '', onClick = nill,
}) => (
  icon ? (
    <button
      type="button"
      className={className ? `nb-key ${className}` : 'nb-key'}
      value={value}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <i className={`icon ${icon}`} />
    </button>
  ) : (
    <input
      type="button"
      className={className ? `nb-key ${className}` : 'nb-key'}
      value={value}
      style={style}
      onClick={onClick}
      disabled={disabled}
    />
  )
);

KeyButton.defaultProps = {
  value: '',
  style: {},
  icon: '',
  disabled: false,
  className: '',
  onClick: nill,
};

KeyButton.propTypes = {
  value: PropTypes.string,
  style: PropTypes.objectOf(Object),
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};


export default KeyButton;
