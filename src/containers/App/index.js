import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styled from 'styled-components';
import loginStore from '@/stores/login';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';

const Wrapper = styled.div`
  height: 100%;
  margin: auto;
`;

const App = () => {
  const { isLoggedIn } = loginStore;

  return (
    <Wrapper>
      {process.env.NODE_ENV !== 'production' && <DevTools />}
      {isLoggedIn ? <HomePage /> : <LoginPage />}
    </Wrapper>
  );
};

export default observer(App);