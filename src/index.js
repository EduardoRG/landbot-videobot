import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Frame from './components/Frame';
import * as serviceWorker from './serviceWorker';

export default class Videobot {
  constructor({ container, ...config }) {
    ReactDOM.render(
      <Frame config={config} />,
      document.querySelector(container)
    );
  }
}

if (process.env.NODE_ENV === 'development') {
  const testConfig = {
    configUrl: 'https://chats.yexir.com/u/H-4829-7531FQJ29N9MBUH4/index.json',
    // video: 'https://player.vimeo.com/external/296210754.sd.mp4?s=9db41d71fa61a2cc19757f656fc5c5c5ef9f69ec&profile_id=164&oauth2_token_id=57447761',
    // video: '/bandbot.mp4',
    video: 'https://static.landbot.io/landbot-widgets/landbot-videobot/bandbot.mp4',
    primary: 'white',
    // secondary: '',
    font: 'Raleway',
    debug: true,
  };

  ReactDOM.render(
    // <App config={testConfig} />,
    <Frame config={testConfig} />,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
