#!/usr/bin/env node
'use strict';

const program = require('commander');
const pack = require('./package.json');
const { configure } = require('./lib/commands/configure');
const { verify } = require('./lib/commands/verify');
const { getAllAssigned } = require('./lib/commands/getAllAssigned');
const { getAllSubmitted } = require('./lib/commands/getAllSubmitted');

const { readConfig } = require('./lib/utils/readConfig');

program
  .name('mergify')
  .version(pack.version);

const options = [
  {
    trigger: '-a --assigned',
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
  {
    trigger: '-v --verify',
    description: 'Verify your config is correct',
    fn: verify
  }
];

const run = async() => {
  let config = await readConfig();

  const {
    userId,
    privateToken
  } = config;

  if (!program.version && (!userId || !privateToken)) {
    await configure();
    config = await readConfig();
    await verify();
  }

  options.forEach(({ trigger, description, fn }) => {
    program.option(trigger, description, (...args) => fn(config, ...args));
  });

  return program;
};

run().then(p => p.parse(process.argv));
