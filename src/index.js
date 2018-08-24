import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import stores from '@/stores';
import StoresContext from '@/components/StoresContext';
import App from '@/containers/App';

import './global-styles';

configure({ enforceActions: true });

ReactDOM.render(
  <StoresContext.Provider value={stores}>
    <App />
  </StoresContext.Provider>,
  document.getElementById('app')
);
