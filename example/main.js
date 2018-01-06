/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <div>
        <div style={{'height': '1024px'}} />
        <App />
        <div style={{'height': '0'}} />
      </div>

    </AppContainer>, div
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default;
    render(NewApp);
  });
}
