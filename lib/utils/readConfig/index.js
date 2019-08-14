const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const { getConfigPath } = require('../getConfigPath');

const err = new Error(`
Oh no, \`mergify\` is not configured yet.
Let configure it`);

async function readConfig() {
  return readFileAsync(getConfigPath(), 'utf8')
    .then((config) => {
      const _config = JSON.parse(config);
      return _config;
    })
    .catch(() => {
      return err;
    });
}

module.exports = {
  readConfig
};