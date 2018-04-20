const {
  path
} = require('ramda');
const { spinner } = require('../../utils/spinner');
const { logger } = require('../../utils/logger');
const { doFetch } = require('../../utils/doFetch');

const UNAUTHORIZED_MESSAGE = '401 Unauthorized';

const verify = async({ userId }) => {
  try {
    logger.log('Verifying your config');
    spinner.start();
    const userResp = await doFetch(`users/${userId}`);

    if (path(['message'], userResp) === UNAUTHORIZED_MESSAGE) {
      throw new Error(UNAUTHORIZED_MESSAGE);
    }

    spinner.stop();
    logger.log('\n🎉  All set, your ready to mergify!');
    return process.exit(0);
  } catch (error) {
    spinner.stop();
    logger.log('\n🙀  Oh no, could not complete verify. Please review your config');
    logger.log(error);
    process.exit(1);
  }
};

module.exports = {
  verify
};
