import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KeyButton from './button';

const nill = () => false;

export default class NumBoard extends Component {
  static defaultProps = {
    style: {},
    onClearNum: nill,
    onInputNum: nill,
    onDeleteNum: nill,
    onClose: nill,
  }

  static propTypes = {
    style: PropTypes.object,
    onClearNum: PropTypes.func,
    onInputNum: PropTypes.func,
    onDeleteNum: PropTypes.func,
    onClose: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClickInputKey(num) {
    this.props.onInputNum(num);
  }

  handleClickDeleteKey() {
    this.props.onDeleteNum();
  }

  handleClickClearKey() {
    this.props.onClearNum();
  }

  handleClickCloseKey() {
    this.props.onClose();
  }

  handleClick(e) {
    if (!this.nbBox.contains(e.target)) {
      this.props.onClose();
    }
  }

  render() {
    const { style = {} } = this.props;
    const inputKeys = Array
      .from({ length: 9 }, (v, k) => (k + 1).toString())
      .concat(['0', '00', '.']);

    return (
      <div
        className="nb-box"
        style={style}
        ref={(nbBox) => { this.nbBox = nbBox; }}
      >
        <div className="nb-box__input">
          {
            inputKeys.map(key => (
              <KeyButton
                key={key}
                onClick={() => this.handleClickInputKey(key)}
                value={key}
                className="nb-key__number"
              />
            ))
          }
        </div>
        <div className="nb-box__control">
          <KeyButton
            onClick={() => this.handleClickDeleteKey()}
            value="<"
            className="nb-key__delete"
          />
          <KeyButton
            onClick={() => this.handleClickClearKey()}
            value="清空"
            className="nb-key__clear"
          />
          <KeyButton
            onClick={() => this.handleClickCloseKey()}
            value="关闭"
            className="nb-key__close"
          />
        </div>
      </div>
    );
  }
}
