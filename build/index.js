'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('./style/index.less');

var _index2 = _interopRequireDefault(_index);

var _Tappable = require('./react-tappable/Tappable');

var _Tappable2 = _interopRequireDefault(_Tappable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keboardNumberItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']; //switch代表切换字母键盘的按钮
var keyboardLettersItems = {
  'firstLine': ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  'secondLine': ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  'thirdLine': ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
};
var keyboardLowerCaseLettersItems = {
  firstLine: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  secondLine: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  thirdLine: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
};
var keyboardStockItems = ['600', '300', '000', '002'];
var TOUCH_MOVE = 'touchmove';

var Keyboard = function (_Component) {
  _inherits(Keyboard, _Component);

  function Keyboard(props, context) {
    _classCallCheck(this, Keyboard);

    var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, props, context));

    _this.handleLetterSwitchTap = function () {
      _this.setState({ isLowerCase: !_this.state.isLowerCase });
    };

    _this.handleKeyboardSwitchTap = function (keyboardType) {
      return function () {
        _this.setState({ type: keyboardType });
      };
    };

    _this.handleHideKeyboardTap = function () {
      if (_this.props.onHide) {
        _this.props.onHide();
      } else {
        _this.setState({ showKeyboard: !_this.state.showKeyboard });
      }
    };

    _this.handleKeyboardTouch = function (value) {
      return function (e) {
        e.preventDefault();
        e.stopPropagation(); //阻止冒泡事件，点击输入框的时候不执行body的绑定操作
        _this.props.onPress(value);
      };
    };

    _this.handleDeleteTap = function () {
      _this.props.onDelete();
    };

    _this.renderStockItems = function () {
      return _react2.default.createElement(
        'ul',
        { styleName: 'stock-key', key: 'stock-key' },
        keyboardStockItems.map(function (item, index) {
          return _react2.default.createElement(
            _Tappable2.default,
            {
              component: 'li',
              key: item + '-' + index,
              styleName: 'digit-item stock-digit-item',
              onTouchEnd: _this.handleKeyboardTouch(item)
            },
            _react2.default.createElement(
              'div',
              null,
              item
            )
          );
        }),
        _react2.default.createElement(
          _Tappable2.default,
          { component: 'li', styleName: 'digit-item action-bg', onTap: _this.handleKeyboardSwitchTap(_this.keyboardTypes.LETTER) },
          _react2.default.createElement(
            'div',
            null,
            'ABC'
          )
        )
      );
    };

    _this.renderDigitKey = function () {
      var type = _this.state.type;


      return _react2.default.createElement(
        'ul',
        { styleName: 'digit-key digit-' + type, key: 'digit-key' },
        keboardNumberItems.map(function (item, index) {
          return _react2.default.createElement(
            _Tappable2.default,
            {
              component: 'li',
              key: item + '-' + index,
              styleName: 'digit-item',
              onTouchEnd: _this.handleKeyboardTouch(item)
            },
            _react2.default.createElement(
              'div',
              null,
              item
            )
          );
        }),
        _react2.default.createElement(
          _Tappable2.default,
          { component: 'li', styleName: 'digit-item', onTap: _this.handleHideKeyboardTap },
          _react2.default.createElement('div', { styleName: 'packUpIcon' })
        )
      );
    };

    _this.renderOperatorKey = function () {
      return _react2.default.createElement(
        'ul',
        { styleName: 'operator-key', key: 'operator-key' },
        _react2.default.createElement(
          _Tappable2.default,
          { component: 'li', styleName: 'action-bg action-image', onTap: _this.handleDeleteTap },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('i', { styleName: 'deleteIcon' })
          )
        ),
        _react2.default.createElement(
          _Tappable2.default,
          { component: 'li', styleName: 'action-bg', onTap: _this.handleHideKeyboardTap },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              '\u786E\u5B9A'
            )
          )
        )
      );
    };

    _this.renderLetterKeyboard = function () {
      var isLowerCase = _this.state.isLowerCase;

      var letterItems = isLowerCase ? keyboardLowerCaseLettersItems : keyboardLettersItems;

      return _react2.default.createElement(
        'ul',
        { styleName: 'letterKey', key: 'letterKey' },
        _react2.default.createElement(
          'ul',
          { styleName: 'flex-center' },
          letterItems.firstLine.map(function (item, index) {
            return _react2.default.createElement(
              _Tappable2.default,
              { component: 'li', key: item + '-' + index, onTouchEnd: _this.handleKeyboardTouch(item) },
              _react2.default.createElement(
                'div',
                null,
                item
              )
            );
          })
        ),
        _react2.default.createElement(
          'ul',
          { styleName: 'flex-center letter-gap' },
          letterItems.secondLine.map(function (item, index) {
            return _react2.default.createElement(
              _Tappable2.default,
              { component: 'li', key: item + '-' + index, onTouchEnd: _this.handleKeyboardTouch(item) },
              _react2.default.createElement(
                'div',
                null,
                item
              )
            );
          })
        ),
        _react2.default.createElement(
          'ul',
          { styleName: 'flex-center letter-gap letter-thirdLine' },
          _react2.default.createElement(
            _Tappable2.default,
            { component: 'div', styleName: 'operator-item operator-item-width action-image', onTap: _this.handleLetterSwitchTap },
            _react2.default.createElement('i', { styleName: isLowerCase ? 'lowerCaseIcon' : 'upperCaseIcon' })
          ),
          letterItems.thirdLine.map(function (item, index) {
            return _react2.default.createElement(
              _Tappable2.default,
              { component: 'li', key: item + '-' + index, onTouchEnd: _this.handleKeyboardTouch(item) },
              _react2.default.createElement(
                'div',
                null,
                item
              )
            );
          }),
          _react2.default.createElement(
            _Tappable2.default,
            { component: 'div', styleName: 'operator-item operator-item-width action-image', onTap: _this.handleDeleteTap },
            _react2.default.createElement('div', { styleName: 'deleteIcon' })
          )
        ),
        _react2.default.createElement(
          'ul',
          { styleName: 'flex-center letter-gap letter-forthLine' },
          _react2.default.createElement(
            _Tappable2.default,
            { component: 'li', styleName: 'operator-item operator-item-width', onTap: _this.handleKeyboardSwitchTap(_this.keyboardTypes.DIGIT) },
            '123'
          ),
          _react2.default.createElement(
            _Tappable2.default,
            { component: 'li', styleName: 'operator-item space', onTapEnd: _this.handleKeyboardTouch(' ') },
            'space'
          ),
          _react2.default.createElement(
            _Tappable2.default,
            { component: 'li', styleName: 'operator-item operator-item-width action-image', onTap: _this.handleHideKeyboardTap },
            _react2.default.createElement('div', { styleName: 'packUpIcon' })
          ),
          _react2.default.createElement(
            'li',
            { styleName: 'operator-item confirm' },
            '\u786E\u5B9A'
          )
        )
      );
    };

    _this.renderKeyboardItems = function () {
      var keyboardItems = [];

      switch (_this.state.type) {
        case _this.keyboardTypes.DIGIT:
          keyboardItems.push(_this.renderDigitKey(), _this.renderOperatorKey());

          break;

        case _this.keyboardTypes.LETTER:
          keyboardItems.push(_this.renderLetterKeyboard());

          break;

        default:
          //默认显示股票键盘
          keyboardItems.push(_this.renderStockItems(), _this.renderDigitKey(), _this.renderOperatorKey());
      }

      return keyboardItems;
    };

    _this.state = {
      isLowerCase: false,
      keyboardItems: [],
      type: _this.props.type,
      showKeyboard: _this.props.showKeyboard
    };

    _this.initialKeyboardType = _this.props.type;
    _this.keyboardTypes = { DIGIT: 'number', STOCK: 'stock', LETTER: 'letter' };
    return _this;
  }

  _createClass(Keyboard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.scrollHide) {
        window.addEventListener(TOUCH_MOVE, this.handleHideKeyboardTap);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.showKeyboard !== this.state.showKeyboard) {
        this.state.showKeyboard = nextProps.showKeyboard;
        this.state.type = this.initialKeyboardType;
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this2 = this;

      var conditions = [function () {
        return _this2.props.showKeyboard !== nextProps.showKeyboard;
      }, function () {
        return _this2.state.type !== nextState.type;
      }, function () {
        return _this2.state.isLowerCase !== nextState.isLowerCase;
      }];

      return conditions.some(function (fn) {
        return fn();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.scrollHide) {
        window.removeEventListener(TOUCH_MOVE, this.handleHideKeyboardTap);
      }
    }

    /**
     * 切换字母键盘大小写
     */


    /**
     * 切换数字键盘
     */

  }, {
    key: 'render',
    value: function render() {
      var clsName = (0, _classnames2.default)({ 'hideKeyboard': !this.state.showKeyboard });

      return _react2.default.createElement(
        'section',
        { styleName: 'keyboard ' + clsName, id: 'keyboard' },
        this.renderKeyboardItems()
      );
    }
  }]);

  return Keyboard;
}(_react.Component);

Keyboard.propTypes = {
  type: _react.PropTypes.oneOf(['number', 'stock', 'letter']), //标志键盘的类型
  showKeyboard: _react.PropTypes.bool,
  onPress: _react.PropTypes.func.isRequired, //点击操作
  onDelete: _react.PropTypes.func.isRequired, //删除操作
  onHide: _react.PropTypes.func, //隐藏密码键盘后的回调函数
  scrollHide: _react.PropTypes.bool, //滑动页面，则收起键盘
  onScroll: _react.PropTypes.func //页面滑动回调函数
};

Keyboard.defaultProps = {
  type: 'number',
  showKeyboard: false
};

exports.default = (0, _reactCssModules2.default)(Keyboard, _index2.default, {
  allowMultiple: true
});