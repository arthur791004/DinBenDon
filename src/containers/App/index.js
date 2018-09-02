import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styled from 'styled-components';
import loginStore from '@/stores/login';
import HomePageLoadable from '@/pages/Home/Loadable';
import LoginPageLoadable from '@/pages/Login/Loadable';

const Wrapper = styled.div`
  height: 100%;
  margin: auto;
`;

const App = () => {
  const { isLoggedIn } = loginStore;

  return (
    <Wrapper>
      {process.env.NODE_ENV !== 'production' && <DevTools />}
      {isLoggedIn ? <HomePageLoadable /> : <LoginPageLoadable />}
    </Wrapper>
  );
};

export default observer(App);