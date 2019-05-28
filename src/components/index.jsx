import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NumBoard from './board';

const nill = () => false;

function show(props = {}, container = window.body) {
  const div = document.createElement('div');
  container.appendChild(div);

  function remove() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    const { onClose = nill } = props;

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    onClose();
  }


  ReactDOM.render(<NumBoard {...props} onClose={() => remove()} />, div);
}


function calculate(domNode, container) {
  const dPosition = domNode.getBoundingClientRect();
  const cPosition = container.getBoundingClientRect();

  const { bottom: dBottom, left: dLeft } = dPosition;
  const { top: cTop, left: cLeft } = cPosition;

  const dHeight = 4;

  const boardTop = (dBottom - cTop) + dHeight;
  const boardLeft = dLeft - cLeft;

  return {
    top: boardTop,
    left: boardLeft,
  };
}

const create = Input => class Wrapper extends Component {
  static defaultProps = {
    onClick: nill,
    onChange: nill,
    disabled: false,
    onKeyPress: nill,
    getContainer: () => document.body,
  }

  static propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    disabled: PropTypes.bool,
    getContainer: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.numBoard = null;
  }

  componentWillUnmount() {
    if (this.numBoard && this.numBoard.props) {
      this.numBoard.props.onClose();
    }
  }

  onClick() {
    // eslint-disable-next-line react/no-find-dom-node
    const domNode = ReactDOM.findDOMNode(this.numInput);
    const { getContainer, disabled, onClick } = this.props;
    const container = getContainer();
    const { top, left } = calculate(domNode, container);
    const value = this.getValue();

    if (!disabled) {
      this.numBoard = show({
        style: {
          top, left,
        },
        value,
        onInputNum: (num) => { this.onInputNum(num); },
        onDeleteNum: () => { this.onDeleteNum(); },
        onClearNum: () => { this.onClearNum(); },
      }, container);
    }

    onClick();
  }

  onInputNum = (num) => {
    const value = this.getValue();
    const newValue = value + num;
    this.setValue(newValue);
  }

  onDeleteNum = () => {
    const value = this.getValue();
    if (value == null) {
      return;
    }

    const val = value.toString();

    if (val.length > 0) {
      const newValue = val.slice(0, val.length - 1);
      this.setValue(newValue);
    }
  }

  onClearNum = () => {
    const newValue = '';
    this.setValue(newValue);
  }

  onChange(e) {
    const value = e.target ? e.target.value : e;
    this.setValue(value);
  }

  getValue() {
    let { value } = this.state;
    if ('value' in this.props) {
      ({ value } = this.props);
    }
    return value;
  }

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  }

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onKeyPress = (e) => {
    const { onKeyPress = nill } = this.props;
    if (e.key === 'Enter') {
      this.numBoard.props.onClose();
    }
    onKeyPress(e);
  }

  render() {
    const { getContainer, ...restProps } = this.props;
    const value = this.getValue();

    return (
      <Input
        value={value}
        {...restProps}
        onClick={() => this.onClick()}
        onChange={e => this.onChange(e)}
        ref={(input) => { this.numInput = input; }}
        onKeyPress={e => this.onKeyPress(e)}
      />
    );
  }
};

export default {
  NumBoard,
  show,
  create,
};
