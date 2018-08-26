import React from 'react';
import { getAuthURL } from '@/services/Slack/utils';

const authURL = getAuthURL();

const LoginSlack = () => (
  <a href={authURL}>
    <img
      alt="Sign in with Slack"
      height="40"
      width="172"
      src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
      srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
    />
  </a>
);

export default LoginSlack;