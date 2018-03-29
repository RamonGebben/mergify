const chalk = require('chalk');
const { pathOr } = require('ramda');

const states = {
  merged: chalk.blue,
  closed: chalk.red,
  opened: chalk.green,
};

const statuses = {
  cannot_be_merged: chalk.red,
  unchecked: chalk.gray,
  can_be_merged: chalk.green,
}

const getUsername = pathOr('Unknown', ['username']);

const printMergeRequest = ({
  iid,
  title,
  state,
  author,
  assignee,
  source_branch,
  target_branch,
  web_url,
  merge_status,
}) => {
  const authorName = getUsername(author);
  const assigneeName = getUsername(assignee);

  console.log(`
${`[${states[state](state)}|${statuses[merge_status](merge_status.replace(/_/g, ' '))}]`}
  !${iid}: ${title}
    Assignee: ${chalk.cyan(assigneeName)}
    Author: ${chalk.cyan(authorName)}
    Source: ${chalk.green(source_branch)}
    Target: ${chalk.magenta(target_branch)}

    ${chalk.gray(web_url)}`,
  );
}

module.exports = {
  printMergeRequest
};
