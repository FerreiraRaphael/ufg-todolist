/* eslint-disable no-multi-assign, react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import tether from 'tether';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './bootstrap-theme.css';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

window.jQuery = window.$ = $;
window.Tether = tether;
require('bootstrap');

const Router = window.matchMedia('(display-mode: standalone)').matches
  ? HashRouter
  : BrowserRouter;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
