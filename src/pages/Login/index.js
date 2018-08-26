import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { parse } from 'query-string';
import { PROJECT_NAME } from '@/constants/messages';
import loginStore from '@/stores/login';
import withStores from '@/components/withStores';
import Loading from '@/components/Loading';
import LoginSlack from '@/components/LoginSlack';

const Error = styled.div.attrs({
  className: 'alert alert-danger',
  role: 'alert',
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  border-radius: 0;
  text-align: center;
`

const Wrapper = styled.div.attrs({
  className: 'd-flex flex-column align-items-center',
})`
  height: 100%;
  padding-top: 20vh;
`;

@observer
class Login extends Component {
  componentDidMount() {
    const { code } = parse(window.location.search);

    if (code) {
      this.props.loginStore.getLoginInfo(code);
    }
  }

  render() {
    const { isLoading, error } = this.props.loginStore;

    return (
      <Wrapper>
        {isLoading ? <Loading size={60} /> : (
          <Fragment>
            {error && <Error children={error} />}

            <h3 className="mb-5 font-weight-bold">{PROJECT_NAME}</h3>
            <LoginSlack />
          </Fragment>
        )}
      </Wrapper>
    )
  }
}

export default withStores(Login, { loginStore });