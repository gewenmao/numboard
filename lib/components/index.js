'use strict';

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

  var div = document.createElement('div');
  document.body.appendChild(div);

  function remove() {
    var unmountResult = _reactDom2.default.unmountComponentAtNode(div);
    var _props$onClose = props.onClose,
        onClose = _props$onClose === undefined ? nill : _props$onClose;


    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    onClose();
  }

  _reactDom2.default.render(_react2.default.createElement(_board2.default, (0, _extends3.default)({}, props, { onClose: function onClose() {
      return remove();
    } })), div);
}

function calculate(position) {
  var dHeight = 8;
  var dWidth = 8;
  var boardHeight = 286;
  var boardWidth = 296;
  var bottom = position.bottom,
      top = position.top,
      left = position.left,
      right = position.right;


  var bodyWidth = document.body.clientWidth;
  var bodyHeight = document.body.clientHeight;
  var scrollTop = window.scrollY;
  var scrollLeft = window.scrollX;

  var canBottom = scrollTop + (bottom + boardHeight) < bodyHeight;
  var canLeft = scrollLeft + (left + boardWidth) < bodyWidth;
  var canRight = scrollLeft + (right + boardWidth) < bodyWidth;
  var canTop = scrollTop + (top - boardHeight) > 0;

  var boardLeft = void 0;
  var boardTop = void 0;

  if (canBottom) {
    boardTop = scrollTop + bottom + dHeight;
    boardLeft = canLeft ? scrollLeft + left : bodyWidth - boardWidth;
  } else if (canRight) {
    boardTop = bodyHeight - boardHeight;
    boardLeft = scrollLeft + right + dWidth;
  } else if (canTop) {
    boardTop = scrollTop + (top - boardHeight - dHeight);
    boardLeft = canLeft ? scrollLeft + left : bodyWidth - boardWidth;
  } else {
    boardTop = scrollTop + bottom + dHeight;
    boardLeft = scrollLeft + left;
  }

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
        var _this$state$value2 = _this.state.value,
            value = _this$state$value2 === undefined ? '' : _this$state$value2;

        if (value.length > 0) {
          var newValue = value.slice(0, value.length - 1);
          _this.setState({ value: newValue });
          _this.triggerChange(newValue);
        }
      };

      _this.onClearNum = function () {
        _this.setState({ value: '' });
        _this.triggerChange('');
      };

      _this.state = {
        value: props.value
      };
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
      key: 'onClick',
      value: function onClick() {
        var _this2 = this;

        var domNode = _reactDom2.default.findDOMNode(this.numInput);
        var position = domNode.getBoundingClientRect();

        var _calculate = calculate(position),
            top = _calculate.top,
            left = _calculate.left;

        if (!this.props.disabled) {
          show({
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
          });
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

        return _react2.default.createElement(Input, (0, _extends3.default)({}, this.props, {
          onClick: function onClick() {
            return _this3.onClick();
          },
          onChange: function onChange(e) {
            return _this3.onChange(e);
          },
          ref: function ref(input) {
            _this3.numInput = input;
          },
          value: this.state.value
        }));
      }
    }]);
    return Wrapper;
  }(_react.Component), _class.defaultProps = {
    onClick: nill,
    onChange: nill,
    disabled: false
  }, _class.propTypes = {
    onClick: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    disabled: _propTypes2.default.bool
  }, _temp;
};

module.exports = {
  NumBoard: _board2.default,
  show: show,
  create: create
};