const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const { logger } = require('../logger');

const err = new Error(`
Oh no, \`mergify\` is not configured yet.
Let configure it`);

function readConfig() {
  const configFileName = `${__dirname}/../../../.config`;
  return readFileAsync(configFileName, 'utf8')
    .then((config) => {
      const _config = JSON.parse(config);
      return _config;
    })
    .catch(() => {
      // logger.log(err.message);
      return err;
    });
}

module.exports = {
  readConfig
};
