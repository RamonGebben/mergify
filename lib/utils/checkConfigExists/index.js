const { access, constants } = require('fs');
const { promisify } = require('util');
const accessAsync = promisify(access);
const { getConfigPath } = require('../getConfigPath');

async function checkConfigExists() {
  try {
    await accessAsync(getConfigPath(), constants.F_OK);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = {
  checkConfigExists
};
