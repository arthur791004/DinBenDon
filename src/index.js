import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { configure } from 'mobx';
import { syncHistoryWithStore } from 'mobx-react-router';
import routingStore from '@/stores/routing';

import App from '@/containers/App';

import './global-styles';

configure({ enforceActions: true });

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('app')
);
