const inquirer = require('inquirer');
const { verify } = require('../verify');
const { writeConfig } = require('../../utils/writeConfig');
const { checkConfigExists } = require('../../utils/checkConfigExists');
const { inputOptions } = require('./inputOptions');
const { logger } = require('../../utils/logger');
const chalk = require('chalk');

const configure = async() => {
  if(await checkConfigExists()){
    logger.warn('Mergify is already configured. Configuring again will override the existing file.');
  }

  try {
    const answers = await inquirer.prompt(inputOptions);
    await writeConfig(answers);

    return verify(answers);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  configure
};
