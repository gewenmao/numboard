"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("./button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nill = function nill() {
  return false;
};

var NumBoard =
/*#__PURE__*/
function (_Component) {
  _inherits(NumBoard, _Component);

  function NumBoard(props) {
    var _this;

    _classCallCheck(this, NumBoard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumBoard).call(this, props));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NumBoard, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      document.addEventListener('click', this.handleClick, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleClick, false);
    }
  }, {
    key: "handleClickInputKey",
    value: function handleClickInputKey(num) {
      var onInputNum = this.props.onInputNum;
      onInputNum(num);
    }
  }, {
    key: "handleClickDeleteKey",
    value: function handleClickDeleteKey() {
      var onDeleteNum = this.props.onDeleteNum;
      onDeleteNum();
    }
  }, {
    key: "handleClickClearKey",
    value: function handleClickClearKey() {
      var onClearNum = this.props.onClearNum;
      onClearNum();
    }
  }, {
    key: "handleClickCloseKey",
    value: function handleClickCloseKey() {
      var onClose = this.props.onClose;
      onClose();
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var onClose = this.props.onClose;

      if (!this.nbBox.contains(e.target)) {
        onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$style = this.props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      var inputKeys = Array.from({
        length: 9
      }, function (v, k) {
        return (k + 1).toString();
      }).concat(['0', '00', '.']);
      return _react["default"].createElement("div", {
        className: "nb-box",
        style: style,
        ref: function ref(nbBox) {
          _this2.nbBox = nbBox;
        }
      }, _react["default"].createElement("div", {
        className: "nb-box__input"
      }, inputKeys.map(function (key) {
        return _react["default"].createElement(_button["default"], {
          key: key,
          onClick: function onClick() {
            return _this2.handleClickInputKey(key);
          },
          value: key,
          className: "nb-key__number"
        });
      })), _react["default"].createElement("div", {
        className: "nb-box__control"
      }, _react["default"].createElement(_button["default"], {
        onClick: function onClick() {
          return _this2.handleClickDeleteKey();
        },
        icon: "icon-delete",
        className: "nb-key__delete"
      }), _react["default"].createElement(_button["default"], {
        onClick: function onClick() {
          return _this2.handleClickClearKey();
        },
        value: "\u6E05\u7A7A",
        className: "nb-key__clear"
      }), _react["default"].createElement(_button["default"], {
        onClick: function onClick() {
          return _this2.handleClickCloseKey();
        },
        value: "\u786E\u5B9A",
        className: "nb-key__close"
      })));
    }
  }]);

  return NumBoard;
}(_react.Component);

exports["default"] = NumBoard;

_defineProperty(NumBoard, "defaultProps", {
  style: {},
  onClearNum: nill,
  onInputNum: nill,
  onDeleteNum: nill,
  onClose: nill
});

_defineProperty(NumBoard, "propTypes", {
  style: _propTypes["default"].objectOf(Object),
  onClearNum: _propTypes["default"].func,
  onInputNum: _propTypes["default"].func,
  onDeleteNum: _propTypes["default"].func,
  onClose: _propTypes["default"].func
});