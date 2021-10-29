import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './Chat'
import TimerView, {myTimer} from './TimerView'
import reportWebVitals from './reportWebVitals';
import messageStore from './mobx/MessageStore';
import webSocket from './lib/websocket';

webSocket.start();

ReactDOM.render(
  <React.StrictMode>
    {/* <TimerView timer={myTimer} /> */}
    <Chat store={messageStore}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
