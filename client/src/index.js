/* eslint-disable no-multi-assign, react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import tether from 'tether';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.jQuery = window.$ = $;
window.Tether = tether;
require('bootstrap');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
