import { stringify } from 'query-string';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, SCOPES } from './constants';

export const getAuthURL = () => {
  const params = stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URL[process.env.NODE_ENV],
    scope: SCOPES.join(','),
  });

  return `https://slack.com/oauth/authorize?${params}`;
}

export const getAccessURL = code => {
  const params = stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URL[process.env.NODE_ENV],
    code,
  });

  return `https://slack.com/api/oauth.access?${params}`;
};