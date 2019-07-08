import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Frame from './components/Frame';
import * as serviceWorker from './serviceWorker';

export default class Typed {
  constructor({ container, ...config }) {
    ReactDOM.render(
      <Frame config={config} />,
      document.querySelector(container)
    );
  }
}

if (process.env.NODE_ENV === 'development') {
  const testConfig = {
    // configUrl: 'https://yexir.com/u/H-2779-Y6QL25RV7OR1T8GH/index.json',
    configUrl: 'https://chats.yexir.com/u/H-4418-KMFMKIL0B0EQCKOX/index.json',
  };

  ReactDOM.render(
    <App config={testConfig} />,
    // <Frame config={testConfig} />,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
