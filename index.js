#!/usr/bin/env node
'use strict';

const program = require('commander');
const R = require('ramda');
const chalk = require('chalk');
const inquirer = require('inquirer');
const pack = require('./package.json');
const { getMergeRequests } = require('./lib/getMergeRequests');
const { printMergeRequest } = require('./lib/printMergeRequest');
const { writeConfig } = require('./lib/writeConfig');
const { readConfig } = require('./lib/readConfig');

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

const getAll = async () => {
  console.log('#getAll')
  const mergeRequests = await getMergeRequests();
  const simplifiedMergeRequest = R.map(simplifyMergeRequest)(mergeRequests);
  simplifiedMergeRequest
    .forEach(printMergeRequest);
};

const getAllAssigned = async ({ userId }) => {
  console.log('#getAllAssigned', userId)
  const mergeRequests = await getMergeRequests();
  const simplifiedMergeRequest = R.map(simplifyMergeRequest)(mergeRequests);
  simplifiedMergeRequest
    .filter(({ state, assignee: { id: assignee } }) => state !== 'merged' && assignee === userId)
    .forEach(printMergeRequest);
}

const getAllSubmitted = async ({ userId }) => {
  console.log('#getAllSubmitted', userId)
  const mergeRequests = await getMergeRequests();
  const simplifiedMergeRequest = R.map(simplifyMergeRequest)(mergeRequests);
  simplifiedMergeRequest
    .filter(({ state, author: { id: author } }) => author === userId && state !== 'merged')
    .forEach(printMergeRequest);
}

const configure = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'userId',
        message: 'What is your Gitlab User ID?'
      },
      {
        type: 'password',
        name: 'privateToken',
        message: 'What private token shall we use?',
      },
      {
        type: 'input',
        name: 'domain',
        default: 'gitlab.com',
        message: 'On what domain is your Gitlab instance?'
      }
    ]);

    return writeConfig(answers);
  } catch (error) {
    throw new Error(error);
    process.exit(1);
  }
}

program
  .name('mergify')
  .version(pack.version)

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
  {
    trigger: '-c --configure',
    description: 'Setup or update required config',
    fn: configure
  },
];

const run = async() => {
  let config = await readConfig();

  const {
    userId,
    privateToken
  } = config;

  if (!userId || !privateToken) {
    await configure();
    config = await readConfig();
    console.log('🎉  All set, your ready to mergify!');
  }

  options.forEach(({ trigger, description, fn }) => {
    program.option(trigger, description, (...args) => fn(config, ...args));
  });

  return program
};

run().then(p => p.parse(process.argv));
