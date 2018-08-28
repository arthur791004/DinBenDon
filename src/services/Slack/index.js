import axios from 'axios';
import { stringify } from 'query-string';
import StorageService from '@/services/Storage';
import { STORAGES } from '@/services/Storage/constants';
import { getAccessURL } from './utils';

export const getLoginInfo = (code) => {
  if (!code) {
    return handleError('Invalid code');
  }

  const url = getAccessURL(code);

  return axios.get(url)
    .then(handleResponse);
}

export const getUserProfile = (userID) => {
  if (!userID) {
    return handleError('Invalid userID');
  }

  const url = 'https://slack.com/api/users.profile.get';
  const params = getParams({ user: userID });

  return axios.post(url, params)
    .then(handleResponse);
}

export const searchMessages = (query, options) => {
  if (!query) {
    return handleError('Invalid query');
  }

  const url = 'https://slack.com/api/search.messages';
  const { count = 20, page = 1 } = options || {};
  const params = getParams({ query, count, page });

  return axios.post(url, params)
    .then(handleResponse);
}

function getParams(params) {
  return stringify({
    token: StorageService.getItem(STORAGES.ACCESS_TOKEN),
    ...params,
  });
}

function handleResponse({ data }) {
  const { ok, error, ...results } = data;

  if (!ok) {
    throw new Error(error);
  }

  return results;
}

function handleError(message) {
  return Promise.reject(new Error(message));
}
