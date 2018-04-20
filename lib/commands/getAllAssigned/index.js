const {
  map
} = require('ramda');
const { spinner } = require('../../utils/spinner');
const { logger } = require('../../utils/logger');
const { getMergeRequests } = require('../../utils/getMergeRequests');
const { printMergeRequest } = require('../../utils/printMergeRequest');
const { simplifyMergeRequest } = require('../../utils/simplifyMergeRequest');

const getAllAssigned = async({ userId }) => {
  spinner.start();
  const params = {
    assignee_id: userId
  };

  const mergeRequests = await getMergeRequests(params);
  spinner.stop();

  const simplifiedMergeRequest = map(simplifyMergeRequest)(mergeRequests);
  const filteredMRs = simplifiedMergeRequest
    .filter(({ state }) => state === 'opened');

  if (filteredMRs.length) {
    return filteredMRs
      .forEach(printMergeRequest);
  }

  return logger.log('\nNo MRs assigned to you');
};

module.exports = {
  getAllAssigned
};
