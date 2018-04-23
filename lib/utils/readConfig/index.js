const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const { logger } = require('../logger');
const { getConfigPath } = require('../getConfigPath');

async function readConfig() {
  try {
    const config = await readFileAsync(getConfigPath(), 'utf8');
    return JSON.parse(config);
  } catch (_) {
    logger.log(`
Oh no, \`mergify\` is not configured yet.
Let configure it
`);
    return {};
  }
}

module.exports = {
  readConfig
};
