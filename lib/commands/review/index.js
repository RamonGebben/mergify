const inquirer = require('inquirer');
const { readdir } = require('fs');
const { promisify } = require('util');
const { spawn, exec } = require('child_process');
const { spinner } = require('../../utils/spinner');
const { logger } = require('../../utils/logger');
const { hasGit } = require('../../utils/hasGit');

const readDirAsync = promisify(readdir);

const getShas = () => new Promise((resolve) => {
  const gitLog = exec('git log --format=format:%H');
  gitLog.stdout.on('data', (data) => {
    resolve(data.split('\n').filter(x => x !== ''));
  });
});

const review = async({ userId }) => {
  const currentWorkingDir = process.cwd();
  const files = await readDirAsync(currentWorkingDir);
  const itHasGit = hasGit(files);
  if (itHasGit) {
    const shas = await getShas();
    const choices = ['HEAD^', ...shas];
    const { sha = 'HEAD^' } = inquirer.prompt([{
      name: 'sha',
      message: 'From which commit do you want to review?',
      type: 'list',
      default: 'HEAD^',
      choices
    }]);

    spinner.start();
    const reset = spawn('git', ['reset', sha]);
    reset.on('close', (code) => spinner.stop());
  } else {
    spinner.stop();
    logger.log('No git');
  }

  // return process.exit(0);
};

module.exports = {
  review
};
