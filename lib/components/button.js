"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var nill = function nill() {
  return false;
};

var KeyButton = function KeyButton(_ref) {
  var value = _ref.value,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      icon = _ref.icon,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? nill : _ref$onClick;
  return icon ? _react["default"].createElement("button", {
    type: "button",
    className: className ? "nb-key ".concat(className) : 'nb-key',
    value: value,
    style: style,
    onClick: onClick,
    disabled: disabled
  }, _react["default"].createElement("i", {
    className: "icon ".concat(icon)
  })) : _react["default"].createElement("input", {
    type: "button",
    className: className ? "nb-key ".concat(className) : 'nb-key',
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
  value: _propTypes["default"].string,
  style: _propTypes["default"].objectOf(Object),
  icon: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func
};
var _default = KeyButton;
exports["default"] = _default;