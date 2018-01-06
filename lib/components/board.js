'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nill = function nill() {
  return false;
};

var NumBoard = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(NumBoard, _Component);

  function NumBoard(props) {
    (0, _classCallCheck3.default)(this, NumBoard);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumBoard.__proto__ || (0, _getPrototypeOf2.default)(NumBoard)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(NumBoard, [{
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

      var inputKeys = (0, _from2.default)({ length: 9 }, function (v, k) {
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
}(_react.Component), _class.defaultProps = {
  style: {},
  onClearNum: nill,
  onInputNum: nill,
  onDeleteNum: nill,
  onClose: nill
}, _class.propTypes = {
  style: _propTypes2.default.object,
  onClearNum: _propTypes2.default.func,
  onInputNum: _propTypes2.default.func,
  onDeleteNum: _propTypes2.default.func,
  onClose: _propTypes2.default.func
}, _temp);
exports.default = NumBoard;