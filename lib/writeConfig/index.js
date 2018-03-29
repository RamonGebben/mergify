const { writeFile } = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(writeFile);

async function writeConfig(config) {
  const configFileName = `${process.cwd()}/.config`;
  config.userId = parseInt(config.userId);

  const body = JSON.stringify(config, null, 2);
  return writeFileAsync(configFileName, body, 'utf8');
}

module.exports = {
  writeConfig
};
