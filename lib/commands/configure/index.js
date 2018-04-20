const inquirer = require('inquirer');
const { verify } = require('../verify');
const { writeConfig } = require('../../utils/writeConfig');
const { inputOptions } = require('./inputOptions');

const configure = async() => {
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
