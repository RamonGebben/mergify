#!/usr/bin/env node
'use strict';

const program = require('commander');
const R = require('ramda');
const chalk = require('chalk');
const pack = require('./package.json');
const { getMergeRequests } = require('./lib/getMergeRequests');

const {
  GITLAB_USER_ID = 0,
  GITLAB_PRIVATE_TOKEN,
} = process.env;

if (!GITLAB_PRIVATE_TOKEN || GITLAB_USER_ID === 0) {
  throw new Error(
`It looks like \`mergify\` was not properly configured.
Please add \`GITLAB_USER_ID\` and \`GITLAB_PRIVATE_TOKEN\` to the environment`);
}

const currentUserId = parseInt(GITLAB_USER_ID);

const padRight = (str, n, fill = '0') => str.length < n ? padRight(str + fill, n, fill) : str;

const simplifyMergeRequest = R.pick([
  'title',
  'id',
  'target_branch',
  'source_branch',
  'state',
  'author',
  'assignee',
  'web_url'
]);

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
`${padRight(`[${states[state](state)}]`, 15, ' ')}
${title}
Branch: ${chalk.cyan(source_branch)}
Assignee: ${chalk.cyan(assignee)}
Author: ${chalk.cyan(author)}
${chalk.gray(web_url)}
`,
  );
}

program
  .name('mergify')
  .version(pack.version)

const getAll = async () => {
  const mergeRequests = await getMergeRequests();
  const simplifiedMergeRequest = R.map(simplifyMergeRequest)(mergeRequests);
  simplifiedMergeRequest
    .forEach(printMergeRequest);
};

const getAllAssigned = async () => {
  if (currentUserId === 1) throw new Error('No user ID configured.');

  const mergeRequests = await getMergeRequests();
  const simplifiedMergeRequest = R.map(simplifyMergeRequest)(mergeRequests);
  simplifiedMergeRequest
    .filter(({ state, assignee: { id: assignee } }) => state !== 'merged' && assignee === currentUserId)
    .forEach(printMergeRequest);
}

const getAllSubmitted = async () => {
  if (currentUserId === 1) throw new Error('No user ID configured.');

  const mergeRequests = await getMergeRequests();
  const simplifiedMergeRequest = R.map(simplifyMergeRequest)(mergeRequests);
  simplifiedMergeRequest
    .filter(({ state, author: { id: author } }) => author === currentUserId && state !== 'merged')
    .forEach(printMergeRequest);
}

const options = [
  {
    trigger: '-a --all',
    description: 'Get all merge request',
    fn: getAll
  },
  {
    trigger: '-m --me',
    description: 'Get all open merge request assigned to you',
    fn: getAllAssigned
  },
  {
    trigger: '-s --submitted',
    description: 'Get all open merge request submitted to you',
    fn: getAllSubmitted
  },
]

options.forEach(({ trigger, description, fn }) => {
  program.option(trigger, description, fn);
});

// Start
program.parse(process.argv);
