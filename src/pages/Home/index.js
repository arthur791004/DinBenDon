import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { APP_NAME } from '@/constants/messages';
import { width } from '@/utils/styles';
import loginStore from '@/stores/login';
import withStores from '@/components/withStores';
import OrderList from '@/components/OrderList';
import { LOGOUT } from './messages';

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Logout = styled.div.attrs({
  className: 'ml-2 text-white',
})`
  cursor: pointer;
`;

const Content = styled.div.attrs({
  className: 'd-flex flex-column align-items-center mx-auto',
})`
  ${width};
`;

const Home = ({ loginStore }) => {
  const { isLoggedIn, userID, userProfile, logout } = loginStore;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark text-white mb-4">
        <a className="navbar-brand" href="/">{APP_NAME}</a>
        <div className="d-flex align-items-center">
          <Avatar className="mx-2" src={userProfile.image_48} />
          <div>{userProfile.real_name}</div>
          <Logout onClick={logout}>{LOGOUT}</Logout>
        </div>
      </nav>
      <Content>
        <Switch location={location}>
          <Route exact path="/shops" render={() => <div>shops</div>} />
          <Route render={() => <OrderList userID={userID} />} />
        </Switch>
      </Content>
    </Fragment>
  );
};

export default withStores(observer(Home), { loginStore });
