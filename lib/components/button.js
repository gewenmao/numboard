'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nill = function nill() {
  return false;
};

var KeyButton = function KeyButton(_ref) {
  var value = _ref.value,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      icon = _ref.icon,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === undefined ? false : _ref$disabled,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? nill : _ref$onClick;
  return icon ? _react2.default.createElement(
    'button',
    {
      className: className ? 'nb-key ' + className : 'nb-key',
      value: value,
      style: style,
      onClick: onClick,
      disabled: disabled
    },
    _react2.default.createElement('i', { className: 'icon ' + icon })
  ) : _react2.default.createElement('input', {
    type: 'button',
    className: className ? 'nb-key ' + className : 'nb-key',
    value: value,
    style: style,
    onClick: onClick,
    disabled: disabled
  });
};

KeyButton.defaultProps = {
  value: '',
  style: {},
  icon: '',
  disabled: false,
  className: '',
  onClick: nill
};

KeyButton.propTypes = {
  value: _propTypes2.default.string,
  style: _propTypes2.default.object,
  icon: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

exports.default = KeyButton;