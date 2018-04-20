const queryString = require('query-string');
const { doFetch } = require('../doFetch');

async function getMergeRequests(params) {
  const stringified = queryString.stringify(params);
  return doFetch(`/merge_requests?scope=all&${stringified}`);
}

module.exports = {
  getMergeRequests
};
