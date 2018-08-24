import React, { Fragment, Component } from 'react';
import { observer } from 'mobx-react';
import { parse } from 'query-string';
import { getAuthURL } from '@/services/slack/utils';
import { withStoresConsumer } from '@/components/StoresContext';

@observer
class LoginSlack extends Component {
  componentDidMount() {
    const { code } = parse(window.location.search);

    if (code) {
      this.props.loginStore.getLoginInfo(code);
    }
  }

  render() {
    const { isLoading, error } = this.props.loginStore;

    return (
      <Fragment>
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <a href={getAuthURL()}>
          <img
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </Fragment>
    );
  }
}

export default withStoresConsumer(LoginSlack, [
  'loginStore',
]);
