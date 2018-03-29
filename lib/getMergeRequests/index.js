const { doFetch } = require('../doFetch');

async function getMergeRequests(id) {
  return doFetch('/merge_requests');
}

module.exports = {
  getMergeRequests
}
