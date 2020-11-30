import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import {Provider} from 'react-redux';
//import * as serviceWorker from './serviceWorker';
import store from './store';
import { BrowserRouter} from 'react-router-dom';

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <React.StrictMode>
        <Router />
    </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
