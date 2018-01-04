'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nill = function nill() {
  return false;
};

var NumBoard = function (_Component) {
  _inherits(NumBoard, _Component);

  function NumBoard(props) {
    _classCallCheck(this, NumBoard);

    var _this = _possibleConstructorReturn(this, (NumBoard.__proto__ || Object.getPrototypeOf(NumBoard)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(NumBoard, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('click', this.handleClick, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleClick, false);
    }
  }, {
    key: 'handleClickInputKey',
    value: function handleClickInputKey(num) {
      this.props.onInputNum(num);
    }
  }, {
    key: 'handleClickDeleteKey',
    value: function handleClickDeleteKey() {
      this.props.onDeleteNum();
    }
  }, {
    key: 'handleClickClearKey',
    value: function handleClickClearKey() {
      this.props.onClearNum();
    }
  }, {
    key: 'handleClickCloseKey',
    value: function handleClickCloseKey() {
      this.props.onClose();
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (!this.nbBox.contains(e.target)) {
        this.props.onClose();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$style = this.props.style,
          style = _props$style === undefined ? {} : _props$style;

      var inputKeys = Array.from({ length: 9 }, function (v, k) {
        return (k + 1).toString();
      }).concat(['0', '00', '.']);

      return _react2.default.createElement(
        'div',
        {
          className: 'nb-box',
          style: style,
          ref: function ref(nbBox) {
            _this2.nbBox = nbBox;
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'nb-box__input' },
          inputKeys.map(function (key) {
            return _react2.default.createElement(_button2.default, {
              key: key,
              onClick: function onClick() {
                return _this2.handleClickInputKey(key);
              },
              value: key,
              className: 'nb-key__number'
            });
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'nb-box__control' },
          _react2.default.createElement(_button2.default, {
            onClick: function onClick() {
              return _this2.handleClickDeleteKey();
            },
            icon: 'icon-delete',
            className: 'nb-key__delete'
          }),
          _react2.default.createElement(_button2.default, {
            onClick: function onClick() {
              return _this2.handleClickClearKey();
            },
            value: '\u6E05\u7A7A',
            className: 'nb-key__clear'
          }),
          _react2.default.createElement(_button2.default, {
            onClick: function onClick() {
              return _this2.handleClickCloseKey();
            },
            value: '\u5173\u95ED',
            className: 'nb-key__close'
          })
        )
      );
    }
  }]);

  return NumBoard;
}(_react.Component);

NumBoard.defaultProps = {
  style: {},
  onClearNum: nill,
  onInputNum: nill,
  onDeleteNum: nill,
  onClose: nill
};
NumBoard.propTypes = {
  style: _propTypes2.default.object,
  onClearNum: _propTypes2.default.func,
  onInputNum: _propTypes2.default.func,
  onDeleteNum: _propTypes2.default.func,
  onClose: _propTypes2.default.func
};
exports.default = NumBoard;