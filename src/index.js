import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Frame from './components/Frame';
import * as serviceWorker from './serviceWorker';

class Typed {
  constructor({ container, ...config }) {
    ReactDOM.render(
      <Frame config={config} />,
      document.querySelector(container)
    );
  }
}

if (process.env.NODE_ENV === 'development') {
  const testConfig = {
    configUrl: 'https://yexir.com/u/H-2779-Y6QL25RV7OR1T8GH/index.json',
  };

  ReactDOM.render(
    <App config={testConfig} />,
    document.getElementById('root')
  );
}

const _Landbot = window.Landbot || {};
window.Landbot = {
  ..._Landbot,
  Typed,
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
