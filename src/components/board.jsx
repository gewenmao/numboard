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
    style: PropTypes.objectOf(Object),
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
    const { onInputNum } = this.props;
    onInputNum(num);
  }

  handleClickDeleteKey() {
    const { onDeleteNum } = this.props;
    onDeleteNum();
  }

  handleClickClearKey() {
    const { onClearNum } = this.props;
    onClearNum();
  }

  handleClickCloseKey() {
    const { onClose } = this.props;
    onClose();
  }

  handleClick(e) {
    const { onClose } = this.props;
    if (!this.nbBox.contains(e.target)) {
      onClose();
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
            icon="icon-delete"
            className="nb-key__delete"
          />
          <KeyButton
            onClick={() => this.handleClickClearKey()}
            value="清空"
            className="nb-key__clear"
          />
          <KeyButton
            onClick={() => this.handleClickCloseKey()}
            value="确定"
            className="nb-key__close"
          />
        </div>
      </div>
    );
  }
}
