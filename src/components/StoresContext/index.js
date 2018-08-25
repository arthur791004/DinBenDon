import React, { createContext } from 'react';

const StoresContext = createContext();

const getRequireStores = (context = {}, requireStores) => {
  const stores = requireStores || [];

  if (stores.length === 0) {
    return context;
  }

  return stores.reduce((acc, cur) => ({
    ...acc,
    [cur]: context[cur] || {},
  }), {});
};

export const withStoresConsumer = (Component, requireStores) => props => (
  <StoresContext.Consumer>
    {context => <Component {...getRequireStores(context, requireStores)} {...props} />}
  </StoresContext.Consumer>
);

export default StoresContext;