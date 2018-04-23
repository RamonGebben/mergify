const inquirer = require('inquirer');
const { readdir } = require('fs');
const { promisify } = require('util');
const { spawn, exec } = require('child_process');
const { spinner } = require('../../utils/spinner');
const { logger } = require('../../utils/logger');
const { hasGit } = require('../../utils/hasGit');

const readDirAsync = promisify(readdir);

const getCommits = () => new Promise((resolve) => {
  const gitLog = exec('git log --format=format:[%h]\\ %s -20');
  gitLog.stdout.on('data', (data) => {
    const commits = data.split('\n')
      .filter(x => x !== '')
      .map(x => x.substr(0, 40).concat('...'));

    return resolve(commits);
  });
});

const review = async({ userId }) => {
  const currentWorkingDir = process.cwd();
  const files = await readDirAsync(currentWorkingDir);
  const itHasGit = hasGit(files);
  if (itHasGit) {
    const commits = await getCommits();
    const choices = ['HEAD^', ...commits];
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
