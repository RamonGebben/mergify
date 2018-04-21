const chalk = require('chalk');
const { pathOr } = require('ramda');
const { logger } = require('../logger');

const states = {
  merged: chalk.blue,
  closed: chalk.red,
  opened: chalk.green
};

const statuses = {
  cannot_be_merged: chalk.red,
  unchecked: chalk.gray,
  can_be_merged: chalk.green
};

const getUsername = pathOr('Unknown', ['username']);

const printMergeRequest = ({
  iid,
  title,
  state,
  author,
  assignee,
  source_branch: sourceBranch,
  target_branch: targetBranch,
  web_url: webURL,
  merge_status: mergeStatus
}) => {
  const authorName = getUsername(author);
  const assigneeName = getUsername(assignee);

  logger.log(`
${`[${states[state](state)}|${statuses[mergeStatus](mergeStatus.replace(/_/g, ' '))}]`}
  !${iid}: ${title}
    Assignee: ${chalk.cyan(assigneeName)}
    Author: ${chalk.cyan(authorName)}
    Source: ${chalk.green(sourceBranch)}
    Target: ${chalk.magenta(targetBranch)}

    ${chalk.gray(webURL)}`
  );
};

module.exports = {
  printMergeRequest
};
