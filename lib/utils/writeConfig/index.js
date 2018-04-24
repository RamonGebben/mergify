const { writeFile } = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(writeFile);
const { getConfigPath } = require('../getConfigPath');

async function writeConfig(config) {
  config.userId = parseInt(config.userId);

  const body = JSON.stringify(config, null, 2);
  return writeFileAsync(getConfigPath(), body, 'utf8');
}

module.exports = {
  writeConfig
};
