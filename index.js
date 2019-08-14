#!/usr/bin/env node
'use strict';

const program = require('commander');
const pack = require('./package.json');
const { logger } = require('./lib/utils/logger');
const { configure } = require('./lib/commands/configure');
const { verify } = require('./lib/commands/verify');
const { getAllAssigned } = require('./lib/commands/getAllAssigned');
const { getAllSubmitted } = require('./lib/commands/getAllSubmitted');
const { review } = require('./lib/commands/review');

const { readConfig } = require('./lib/utils/readConfig');

program
  .name('mergify')
  .version(pack.version);

const commands = [
  {
    trigger: 'assigned',
    description: 'Get all open merge request assigned to you',
    fn: getAllAssigned
  },
  {
    trigger: 'submitted',
    description: 'Get all open merge request submitted to you',
    fn: getAllSubmitted
  },
  {
    trigger: 'review',
    description: 'Return changes to dirty state so you can review code locally',
    fn: review
  },
  {
    trigger: 'configure',
    trigger: 'configure',
    description: 'Setup or update required config',
    fn: configure
  },
  {
    trigger: 'verify',
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

  commands.forEach(({ trigger, description, fn }) => {
    program
      .command(trigger)
      .description(description)
      .action((...args) => fn(config, ...args));
  });

  return program;
};

run().then(p => {
  p.parse(process.argv);
  if (!process.argv.slice(2).length) {
    logger.log('No arguments specified, showing help.');
    p.outputHelp();
  }
});
