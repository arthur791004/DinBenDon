import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import App from '@/containers/App';

import './global-styles';

configure({ enforceActions: true });

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
