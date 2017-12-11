import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style/index.less';
import Tappable from './react-tappable/Tappable';

const keboardNumberItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];  //switch代表切换字母键盘的按钮
const keyboardLettersItems = {
  'firstLine': ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  'secondLine': ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  'thirdLine': ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
};
const keyboardLowerCaseLettersItems = {
  firstLine: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  secondLine: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  thirdLine: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
};
const keyboardStockItems = ['600', '300', '000', '002'];
const TOUCH_MOVE = 'touchmove';
const defaultPrefixCls = 'cefc-keyboard';

class Keyboard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLowerCase: false,
      keyboardItems: [],
      type: this.props.type,
      showKeyboard: this.props.showKeyboard,
    };

    this.initialKeyboardType = this.props.type;
    this.keyboardTypes = { DIGIT: 'number', STOCK: 'stock', LETTER: 'letter' };
  }

  componentDidMount() {
    if (this.props.scrollHide) {
      window.addEventListener(TOUCH_MOVE, this.handleHideKeyboardTap)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showKeyboard !== this.state.showKeyboard) {
      this.state.showKeyboard = nextProps.showKeyboard;
      this.state.type = this.initialKeyboardType;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const conditions = [
      () => { return this.props.showKeyboard !== nextProps.showKeyboard },
      () => { return this.state.type !== nextState.type },
      () => { return this.state.isLowerCase !== nextState.isLowerCase }
    ];

    return conditions.some((fn) => { return fn(); });
  }

  componentWillUnmount() {
    if(this.props.scrollHide) {
      window.removeEventListener(TOUCH_MOVE, this.handleHideKeyboardTap);
    }
  }

  /**
   * 切换字母键盘大小写
   */
  handleLetterSwitchTap = () => {
    this.setState({ isLowerCase: !this.state.isLowerCase });
  }

  /**
   * 切换数字键盘
   */
  handleKeyboardSwitchTap = (keyboardType) => {
    return () => {
      this.setState({ type: keyboardType });
    }
  }

  handleHideKeyboardTap = () => {
    if (this.props.onHide) {
      this.props.onHide();
    } else {
      this.setState({ showKeyboard: !this.state.showKeyboard });
    }
  }

  handleKeyboardTouch = (value) => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation(); //阻止冒泡事件，点击输入框的时候不执行body的绑定操作
      this.props.onPress(value);
    }
  }

  handleDeleteTap = () => {
    this.props.onDelete();
  }

  renderStockItems = () => {
    const prefixCls = this.props.prefixCls;
    const stockItemsCls = classnames(`${prefixCls}-digit-item`, `${prefixCls}-stock-digit-item`);
    const actionCls = classnames(`${prefixCls}-digit-item`, `${prefixCls}-action-bg`);
    return (
        <ul className={`${prefixCls}-stock-key`} key="stock-key">
          {keyboardStockItems.map((item, index) => {
            return (
                <Tappable
                    component="li"
                    key={`${item}-${index}`}
                    className={stockItemsCls}
                    onTouchEnd={this.handleKeyboardTouch(item)}
                >
                  <div>{item}</div>
                </Tappable>
            )
          })}
          <Tappable component="li" className={actionCls} onTap={this.handleKeyboardSwitchTap(this.keyboardTypes.LETTER)}><div>ABC</div></Tappable>
        </ul>
    );
  }

  renderDigitKey = () => {
    const { type } = this.state;
    const prefixCls = this.props.prefixCls;

    return (
        <ul className={`${prefixCls}-digit-key ${prefixCls}-digit-${type}`} key="digit-key">
          {keboardNumberItems.map((item, index) => {
            return (
                <Tappable
                    component="li"
                    key={`${item}-${index}`}
                    className={`${prefixCls}-digit-item`}
                    onTouchEnd={this.handleKeyboardTouch(item)}
                >
                  <div>{item}</div>
                </Tappable>
            );
          })}
          <Tappable component="li" className={`${prefixCls}-digit-item`} onTap={this.handleHideKeyboardTap}>
            <div className={`${prefixCls}-packUpIcon`}>{}</div>
          </Tappable>
        </ul>
    )
  }

  renderOperatorKey = () => {
    const prefixCls = this.props.prefixCls;

    return (
        <ul className={`${prefixCls}-operator-key`} key="operator-key">
          <Tappable component="li" className={`${prefixCls}-action-bg ${prefixCls}-action-image`} onTap={this.handleDeleteTap}>
            <div>
              <i className={`${prefixCls}-deleteIcon`} />
            </div>
          </Tappable>
          <Tappable component="li" className={`${prefixCls}-action-bg`} onTap={this.handleHideKeyboardTap}>
            <div><span>确定</span></div>
          </Tappable>
        </ul>
    );
  }

  renderLetterKeyboard = () => {
    const { isLowerCase } = this.state;
    const prefixCls = this.props.prefixCls;
    const letterItems = isLowerCase ? keyboardLowerCaseLettersItems : keyboardLettersItems;

    return (
        <ul className={`${prefixCls}-letterKey`} key="letterKey">
          <ul className={`${prefixCls}-flex-center`}>
            {letterItems.firstLine.map((item, index) => {
              return <Tappable component="li" key={`${item}-${index}`} onTouchEnd={this.handleKeyboardTouch(item)}><div>{item}</div></Tappable>
            })}
          </ul>
          <ul className={`${prefixCls}-flex-center ${prefixCls}-letter-gap`}>
            {letterItems.secondLine.map((item, index) => {
              return <Tappable component="li" key={`${item}-${index}`} onTouchEnd={this.handleKeyboardTouch(item)}><div>{item}</div></Tappable>
            })}
          </ul>
          <ul className={`${prefixCls}-flex-center ${prefixCls}-letter-gap ${prefixCls}-letter-thirdLine`}>
            <Tappable component="div" className={`${prefixCls}-operator-item ${prefixCls}-operator-item-width ${prefixCls}-action-image`} onTap={this.handleLetterSwitchTap}>
              <i className={isLowerCase ? `${prefixCls}-lowerCaseIcon` : `${prefixCls}-upperCaseIcon`}>{}</i>
            </Tappable>
            {letterItems.thirdLine.map((item, index) => {
              return <Tappable component="li" key={`${item}-${index}`} onTouchEnd={this.handleKeyboardTouch(item)}><div>{item}</div></Tappable>
            })}
            <Tappable component="div" className={`${prefixCls}-operator-item ${prefixCls}-operator-item-width ${prefixCls}-action-image`} onTap={this.handleDeleteTap}>
              <div className={`${prefixCls}-deleteIcon`}>{}</div>
            </Tappable>
          </ul>
          <ul className={`${prefixCls}-flex-center ${prefixCls}-letter-gap ${prefixCls}-letter-forthLine`}>
            <Tappable component="li" className={`${prefixCls}-operator-item ${prefixCls}-operator-item-width`} onTap={this.handleKeyboardSwitchTap(this.keyboardTypes.DIGIT)}>123</Tappable>
            <Tappable component="li" className={`${prefixCls}-operator-item ${prefixCls}-space`} onTapEnd={this.handleKeyboardTouch(' ')}>space</Tappable>
            <Tappable component="li" className={`${prefixCls}-operator-item ${prefixCls}-operator-item-width ${prefixCls}-action-image`} onTap={this.handleHideKeyboardTap}>
              <div className={`${prefixCls}-packUpIcon`}>{}</div>
            </Tappable>
            <li className={`${prefixCls}-operator-item ${prefixCls}-confirm`}>确定</li>
          </ul>
        </ul>
    )
  }

  renderKeyboardItems = () => {
    const keyboardItems = [];

    switch (this.state.type) {
      case this.keyboardTypes.DIGIT:
        keyboardItems.push(this.renderDigitKey(), this.renderOperatorKey());

        break;

      case this.keyboardTypes.LETTER:
        keyboardItems.push(this.renderLetterKeyboard());

        break;

      default: //默认显示股票键盘
        keyboardItems.push(this.renderStockItems(), this.renderDigitKey(), this.renderOperatorKey());
    }

    return keyboardItems;
  }

  render() {
    const prefixCls = this.props.prefixCls;
    const clsName = classnames(prefixCls,{
        [`${prefixCls}-keyboard`]: true,
        [`${prefixCls}-hideKeyboard`]: !this.state.showKeyboard
    });

    return (
        <section className={clsName} id="keyboard">
          {this.renderKeyboardItems()}
        </section>
    )
  }
}

Keyboard.propTypes = {
  prefixCls: PropTypes.string,                          //自定义类
  type: PropTypes.oneOf(['number', 'stock', 'letter']), //标志键盘的类型
  showKeyboard: PropTypes.bool,
  onPress: PropTypes.func.isRequired,  //点击操作
  onDelete: PropTypes.func.isRequired, //删除操作
  onHide: PropTypes.func, //隐藏密码键盘后的回调函数
  scrollHide: PropTypes.bool,  //滑动页面，则收起键盘
  onScroll: PropTypes.func,    //页面滑动回调函数
};

Keyboard.defaultProps = {
  prefixCls: defaultPrefixCls,
  type: 'number',
  showKeyboard: false
};

export default Keyboard;