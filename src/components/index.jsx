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


  return ReactDOM.render(
    <NumBoard {...props} onClose={() => remove()} />
  , div);
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
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.numBoard = null;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  componentWillUnmount() {
    if (this.numBoard && this.numBoard.props) {
      this.numBoard.props.onClose();
    }
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onClick() {
    const domNode = ReactDOM.findDOMNode(this.numInput);
    const container = this.props.getContainer();
    const { top, left } = calculate(domNode, container);

    if (!this.props.disabled) {
      this.numBoard = show({
        style: {
          top, left,
        },
        value: this.state.value,
        onInputNum: (value) => { this.onInputNum(value); },
        onDeleteNum: () => { this.onDeleteNum(); },
        onClearNum: () => { this.onClearNum(); },
      }, container);
    }

    this.props.onClick();
  }

  onInputNum = (num) => {
    const { value = '' } = this.state;
    const newValue = value + num;
    this.setState({ value: newValue });
    this.triggerChange(newValue);
  }

  onDeleteNum = () => {
    const { value } = this.state;
    if (value == null) {
      return;
    }

    const val = value.toString();

    if (val.length > 0) {
      const newValue = val.slice(0, val.length - 1);
      this.setState({ value: newValue });
      this.triggerChange(newValue);
    }
  }

  onClearNum = () => {
    this.setState({ value: '' });
    this.triggerChange('');
  }

  onChange(e) {
    const value = e.target ? e.target.value : e;
    if (!('value' in this.props)) {
      this.setState({ value });
    }

    this.props.onChange(value);
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
    return (
      <Input
        {...restProps}
        onClick={() => this.onClick()}
        onChange={e => this.onChange(e)}
        ref={(input) => { this.numInput = input; }}
        value={this.state.value}
        onKeyPress={e => this.onKeyPress(e)}
      />
    );
  }
};

module.exports = {
  NumBoard,
  show,
  create,
};
