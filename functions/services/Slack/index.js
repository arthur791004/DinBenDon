const axios = require('axios');
const { stringify } = require('query-string');
const { LUNCH_INFO } = require('./constants');

const searchMessages = (query) => {
  if (!query) {
    return handleError('Invalid query');
  }

  const url = 'https://slack.com/api/search.messages';
  const params = getParams({ query });

  return axios.post(url, params)
    .then(handleResponse);
}

const { BOT_NAME, CHANNEL_NAME } = LUNCH_INFO;
const query = `from:@${BOT_NAME} in:${CHANNEL_NAME}`;

searchMessages(query)
  .then(console.log);

module.exports = {
  searchMessages,
};

function getParams(params) {
  return stringify({
    token: process.env.ACCESS_TOKEN,
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
