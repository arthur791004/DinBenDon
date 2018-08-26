import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import loginStore from '@/stores/login';
import withStores from '@/components/withStores';
import LoginSlack from '@/components/LoginSlack';
import OrderList from '@/components/OrderList';

const App = ({ loginStore }) => {
  const { userID, userProfile } = loginStore;

  return (
    <Fragment>
      <h1>DinBenDon</h1>
      {userProfile ? (
        <Fragment>
          <div>Hello, {userProfile.real_name}</div>
          <OrderList userID={userID} />
        </Fragment>
      ) : (
        <LoginSlack />
      )}
    </Fragment>
  );
};

export default withStores(observer(App), { loginStore });