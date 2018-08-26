import React from 'react';

const withStores = (Component, stores = {}) => props => (
  <Component {...stores} {...props} />
);

export default withStores;