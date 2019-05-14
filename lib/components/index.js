'use strict';

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nill = function nill() {
  return false;
};

function show() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.body;

  var div = document.createElement('div');
  container.appendChild(div);

  function remove() {
    var unmountResult = _reactDom2.default.unmountComponentAtNode(div);
    var _props$onClose = props.onClose,
        onClose = _props$onClose === undefined ? nill : _props$onClose;


    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    onClose();
  }

  return _reactDom2.default.render(_react2.default.createElement(_board2.default, (0, _extends3.default)({}, props, { onClose: function onClose() {
      return remove();
    } })), div);
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

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(Wrapper, _Component);

    function Wrapper(props) {
      (0, _classCallCheck3.default)(this, Wrapper);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Wrapper.__proto__ || (0, _getPrototypeOf2.default)(Wrapper)).call(this, props));

      _this.triggerChange = function (changedValue) {
        var onChange = _this.props.onChange;
        if (onChange) {
          onChange(changedValue);
        }
      };

      _this.onInputNum = function (num) {
        var _this$state$value = _this.state.value,
            value = _this$state$value === undefined ? '' : _this$state$value;

        var newValue = value + num;
        _this.setState({ value: newValue });
        _this.triggerChange(newValue);
      };

      _this.onDeleteNum = function () {
        var value = _this.state.value;

        if (value == null) {
          return;
        }

        var val = value.toString();

        if (val.length > 0) {
          var newValue = val.slice(0, val.length - 1);
          _this.setState({ value: newValue });
          _this.triggerChange(newValue);
        }
      };

      _this.onClearNum = function () {
        _this.setState({ value: '' });
        _this.triggerChange('');
      };

      _this.onKeyPress = function (e) {
        var _this$props$onKeyPres = _this.props.onKeyPress,
            onKeyPress = _this$props$onKeyPres === undefined ? nill : _this$props$onKeyPres;

        if (e.key === 'Enter') {
          _this.numBoard.props.onClose();
        }
        onKeyPress(e);
      };

      _this.state = {
        value: props.value
      };
      _this.numBoard = null;
      return _this;
    }

    (0, _createClass3.default)(Wrapper, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
          var value = nextProps.value;
          this.setState({ value: value });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.numBoard && this.numBoard.props) {
          this.numBoard.props.onClose();
        }
      }
    }, {
      key: 'onClick',
      value: function onClick() {
        var _this2 = this;

        var domNode = _reactDom2.default.findDOMNode(this.numInput);
        var container = this.props.getContainer();

        var _calculate = calculate(domNode, container),
            top = _calculate.top,
            left = _calculate.left;

        if (!this.props.disabled) {
          this.numBoard = show({
            style: {
              top: top, left: left
            },
            value: this.state.value,
            onInputNum: function onInputNum(value) {
              _this2.onInputNum(value);
            },
            onDeleteNum: function onDeleteNum() {
              _this2.onDeleteNum();
            },
            onClearNum: function onClearNum() {
              _this2.onClearNum();
            }
          }, container);
        }

        this.props.onClick();
      }
    }, {
      key: 'onChange',
      value: function onChange(e) {
        var value = e.target ? e.target.value : e;
        if (!('value' in this.props)) {
          this.setState({ value: value });
        }

        this.props.onChange(value);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props = this.props,
            getContainer = _props.getContainer,
            restProps = (0, _objectWithoutProperties3.default)(_props, ['getContainer']);

        return _react2.default.createElement(Input, (0, _extends3.default)({}, restProps, {
          onClick: function onClick() {
            return _this3.onClick();
          },
          onChange: function onChange(e) {
            return _this3.onChange(e);
          },
          ref: function ref(input) {
            _this3.numInput = input;
          },
          value: this.state.value,
          onKeyPress: function onKeyPress(e) {
            return _this3.onKeyPress(e);
          }
        }));
      }
    }]);
    return Wrapper;
  }(_react.Component), _class.defaultProps = {
    onClick: nill,
    onChange: nill,
    disabled: false,
    onKeyPress: nill,
    getContainer: function getContainer() {
      return document.body;
    }
  }, _class.propTypes = {
    onClick: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func,
    disabled: _propTypes2.default.bool,
    getContainer: _propTypes2.default.func
  }, _temp;
};

module.exports = {
  NumBoard: _board2.default,
  show: show,
  create: create
};