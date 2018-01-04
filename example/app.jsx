import React, { Component } from 'react';
import C from '../src/index';
import './style.less';

const Input = C.create('input');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
      disabled: false,
    };
  }

  render() {
    const { value, disabled } = this.state;
    return (
      <div>
        <button onClick={() => { this.setState({ value: '+1s', disabled: !disabled }); }}> +1s </button>
        <Input value={value} disabled={disabled} onClick={() => { console.log('click'); }} />
      </div>
    );
  }

}

export default App;
