const {
  map
} = require('ramda');
const { spinner } = require('../../utils/spinner');
const { logger } = require('../../utils/logger');
const { getMergeRequests } = require('../../utils/getMergeRequests');
const { printMergeRequest } = require('../../utils/printMergeRequest');
const { simplifyMergeRequest } = require('../../utils/simplifyMergeRequest');

const getAllSubmitted = async({ userId }) => {
  spinner.text = 'Retrieving all Merge Requests that you submitted';
  spinner.start();
  const params = {
    author_id: userId
  };

  const mergeRequests = await getMergeRequests(params);
  spinner.stop();
  const simplifiedMergeRequest = map(simplifyMergeRequest)(mergeRequests);
  const filteredMRs = simplifiedMergeRequest
    .filter(({ state }) => state !== 'merged');

  if (filteredMRs.length) {
    return filteredMRs
      .forEach(printMergeRequest);
  }

  return logger.log('\nNo MRs ready for review');
};

module.exports = {
  getAllSubmitted
};
