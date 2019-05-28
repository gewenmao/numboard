"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _board = _interopRequireDefault(require("./board"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var nill = function nill() {
  return false;
};

function show() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.body;
  var div = document.createElement('div');
  container.appendChild(div);

  function remove() {
    var unmountResult = _reactDom["default"].unmountComponentAtNode(div);

    var _props$onClose = props.onClose,
        onClose = _props$onClose === void 0 ? nill : _props$onClose;

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    onClose();
  }

  _reactDom["default"].render(_react["default"].createElement(_board["default"], _extends({}, props, {
    onClose: function onClose() {
      return remove();
    }
  })), div);
}

function calculate(domNode, container) {
  var dPosition = domNode.getBoundingClientRect();
  var cPosition = container.getBoundingClientRect();
  var dBottom = dPosition.bottom,
      dLeft = dPosition.left;
  var cTop = cPosition.top,
      cLeft = cPosition.left;
  var dHeight = 4;
  var boardTop = dBottom - cTop + dHeight;
  var boardLeft = dLeft - cLeft;
  return {
    top: boardTop,
    left: boardLeft
  };
}

var create = function create(Input) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Wrapper, _Component);

    function Wrapper(props) {
      var _this;

      _classCallCheck(this, Wrapper);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "onInputNum", function (num) {
        var value = _this.getValue();

        var newValue = value + num;

        _this.setValue(newValue);
      });

      _defineProperty(_assertThisInitialized(_this), "onDeleteNum", function () {
        var value = _this.getValue();

        if (value == null) {
          return;
        }

        var val = value.toString();

        if (val.length > 0) {
          var newValue = val.slice(0, val.length - 1);

          _this.setValue(newValue);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onClearNum", function () {
        var newValue = '';

        _this.setValue(newValue);
      });

      _defineProperty(_assertThisInitialized(_this), "triggerChange", function (changedValue) {
        var onChange = _this.props.onChange;

        if (onChange) {
          onChange(changedValue);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
        var _this$props$onKeyPres = _this.props.onKeyPress,
            onKeyPress = _this$props$onKeyPres === void 0 ? nill : _this$props$onKeyPres;

        if (e.key === 'Enter') {
          _this.numBoard.props.onClose();
        }

        onKeyPress(e);
      });

      _this.state = {
        value: ''
      };
      _this.numBoard = null;
      return _this;
    }

    _createClass(Wrapper, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.numBoard && this.numBoard.props) {
          this.numBoard.props.onClose();
        }
      }
    }, {
      key: "onClick",
      value: function onClick() {
        var _this2 = this;

        // eslint-disable-next-line react/no-find-dom-node
        var domNode = _reactDom["default"].findDOMNode(this.numInput);

        var _this$props = this.props,
            getContainer = _this$props.getContainer,
            disabled = _this$props.disabled,
            onClick = _this$props.onClick;
        var container = getContainer();

        var _calculate = calculate(domNode, container),
            top = _calculate.top,
            left = _calculate.left;

        var value = this.getValue();

        if (!disabled) {
          this.numBoard = show({
            style: {
              top: top,
              left: left
            },
            value: value,
            onInputNum: function onInputNum(num) {
              _this2.onInputNum(num);
            },
            onDeleteNum: function onDeleteNum() {
              _this2.onDeleteNum();
            },
            onClearNum: function onClearNum() {
              _this2.onClearNum();
            }
          }, container);
        }

        onClick();
      }
    }, {
      key: "onChange",
      value: function onChange(e) {
        var value = e.target ? e.target.value : e;
        this.setValue(value);
      }
    }, {
      key: "getValue",
      value: function getValue() {
        var value = this.state.value;

        if ('value' in this.props) {
          value = this.props.value;
        }

        return value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        if (!('value' in this.props)) {
          this.setState({
            value: value
          });
        }

        this.triggerChange(value);
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var _this$props2 = this.props,
            getContainer = _this$props2.getContainer,
            restProps = _objectWithoutProperties(_this$props2, ["getContainer"]);

        var value = this.getValue();
        return _react["default"].createElement(Input, _extends({
          value: value
        }, restProps, {
          onClick: function onClick() {
            return _this3.onClick();
          },
          onChange: function onChange(e) {
            return _this3.onChange(e);
          },
          ref: function ref(input) {
            _this3.numInput = input;
          },
          onKeyPress: function onKeyPress(e) {
            return _this3.onKeyPress(e);
          }
        }));
      }
    }]);

    return Wrapper;
  }(_react.Component), _defineProperty(_class, "defaultProps", {
    onClick: nill,
    onChange: nill,
    disabled: false,
    onKeyPress: nill,
    getContainer: function getContainer() {
      return document.body;
    }
  }), _defineProperty(_class, "propTypes", {
    onClick: _propTypes["default"].func,
    onChange: _propTypes["default"].func,
    onKeyPress: _propTypes["default"].func,
    disabled: _propTypes["default"].bool,
    getContainer: _propTypes["default"].func,
    // eslint-disable-next-line react/require-default-props
    value: _propTypes["default"].string
  }), _temp;
};

var _default = {
  NumBoard: _board["default"],
  show: show,
  create: create
};
exports["default"] = _default;