import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { withStoresConsumer } from '@/components/StoresContext';
import LoginSlack from '@/components/LoginSlack';

const App = ({ loginStore }) => {
  const { user } = loginStore;

  return (
    <div>
      <h1>DinBenDon</h1>
      {user ? (
        <div>Hello, {user.name}</div>
      ) : (
        <LoginSlack />
      )}
    </div>
  );
};

export default withStoresConsumer(observer(App), [
  'loginStore',
]);