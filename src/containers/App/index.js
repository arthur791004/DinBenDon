import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import loginStore from '@/stores/login';
import withStores from '@/components/withStores';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';

const Wrapper = styled.div`
  height: 100%;
  margin: auto;
`;

const App = ({ loginStore }) => {
  const { isLoggedIn } = loginStore;

  return (
    <Wrapper>
      {isLoggedIn ? <HomePage /> : <LoginPage />}
    </Wrapper>
  );
};

export default withStores(observer(App), { loginStore });