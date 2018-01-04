'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nill = function nill() {
  return false;
};

function showNumBoard() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var div = document.createElement('div');
  document.body.appendChild(div);

  function remove() {
    var unmountResult = _reactDom2.default.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  _reactDom2.default.render(_react2.default.createElement(_board2.default, _extends({}, props, { onClose: function onClose() {
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
    _inherits(Wrapper, _Component);

    function Wrapper(props) {
      _classCallCheck(this, Wrapper);

      var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

      _this.state = {
        value: props.value
      };
      return _this;
    }

    _createClass(Wrapper, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var value = nextProps.value;

        this.setState({ value: value });
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
          showNumBoard({
            style: {
              top: top, left: left
            },
            value: this.state.value,
            onInput: function onInput(value) {
              _this2.onInput(value);
            },
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
      key: 'onInput',
      value: function onInput(value) {
        this.props.onChange({
          target: { value: value }
        });
      }
    }, {
      key: 'onInputNum',
      value: function onInputNum(num) {
        var _state$value = this.state.value,
            value = _state$value === undefined ? '' : _state$value;

        var newValue = value + num;
        this.setState({ value: newValue });
        this.onInput(newValue);
      }
    }, {
      key: 'onDeleteNum',
      value: function onDeleteNum() {
        var _state$value2 = this.state.value,
            value = _state$value2 === undefined ? '' : _state$value2;

        if (value.length > 0) {
          var newValue = value.slice(0, value.length - 1);
          this.setState({ value: newValue });
          this.onInput(newValue);
        }
      }
    }, {
      key: 'onClearNum',
      value: function onClearNum() {
        this.setState({ value: '' });
        this.onInput('');
      }
    }, {
      key: 'onChange',
      value: function onChange(e) {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        return _react2.default.createElement(Input, _extends({}, this.props, {
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
    value: '',
    disabled: false
  }, _class.propTypes = {
    onClick: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    value: _propTypes2.default.string,
    disabled: _propTypes2.default.bool
  }, _temp;
};

module.exports = {
  showNumBoard: showNumBoard,
  NumBoard: _board2.default,
  create: create
};