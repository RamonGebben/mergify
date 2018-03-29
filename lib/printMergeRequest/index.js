const chalk = require('chalk');

const states = {
  merged: chalk.blue,
  closed: chalk.red,
  opened: chalk.green,
};

const printMergeRequest = ({
  title,
  state,
  author: { username: author },
  assignee: { username: assignee },
  source_branch,
  web_url,
}) => {
  console.log(
    `
${`[${states[state](state)}]`}
${title}
Branch: ${chalk.cyan(source_branch)}
Assignee: ${chalk.cyan(assignee)}
Author: ${chalk.cyan(author)}
${chalk.gray(web_url)}`,
  );
}

module.exports = {
  printMergeRequest
};
