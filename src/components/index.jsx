import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NumBoard from './board';

const nill = () => false;

function showNumBoard(props = {}) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function remove() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  ReactDOM.render(
    <NumBoard {...props} onClose={() => remove()} />
  , div);
}


function calculate(position) {
  const dHeight = 8;
  const dWidth = 8;
  const boardHeight = 286;
  const boardWidth = 296;
  const { bottom, top, left, right } = position;

  const bodyWidth = document.body.clientWidth;
  const bodyHeight = document.body.clientHeight;
  const scrollTop = window.scrollY;
  const scrollLeft = window.scrollX;

  const canBottom = scrollTop + (bottom + boardHeight) < bodyHeight;
  const canLeft = scrollLeft + (left + boardWidth) < bodyWidth;
  const canRight = scrollLeft + (right + boardWidth) < bodyWidth;
  const canTop = scrollTop + (top - boardHeight) > 0;

  let boardLeft;
  let boardTop;

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
    left: boardLeft,
  };
}

const create = Input => class Wrapper extends Component {
  static defaultProps = {
    onClick: nill,
    onChange: nill,
    value: '',
    disabled: false,
  }

  static propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value });
  }

  onClick() {
    const domNode = ReactDOM.findDOMNode(this.numInput);
    const position = domNode.getBoundingClientRect();
    const { top, left } = calculate(position);

    if (!this.props.disabled) {
      showNumBoard({
        style: {
          top, left,
        },
        value: this.state.value,
        onInput: (value) => { this.onInput(value); },
        onInputNum: (value) => { this.onInputNum(value); },
        onDeleteNum: () => { this.onDeleteNum(); },
        onClearNum: () => { this.onClearNum(); },
      });
    }

    this.props.onClick();
  }

  onInput(value) {
    this.props.onChange({
      target: { value },
    });
  }

  onInputNum(num) {
    const { value = '' } = this.state;
    const newValue = value + num;
    this.setState({ value: newValue });
    this.onInput(newValue);
  }

  onDeleteNum() {
    const { value = '' } = this.state;
    if (value.length > 0) {
      const newValue = value.slice(0, value.length - 1);
      this.setState({ value: newValue });
      this.onInput(newValue);
    }
  }

  onClearNum() {
    this.setState({ value: '' });
    this.onInput('');
  }

  onChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  render() {
    return (
      <Input
        {...this.props}
        onClick={() => this.onClick()}
        onChange={e => this.onChange(e)}
        ref={(input) => { this.numInput = input; }}
        value={this.state.value}
      />
    );
  }
};

module.exports = {
  showNumBoard,
  NumBoard,
  create,
};
