#!/usr/bin/env node
'use strict';

const program = require('commander');
const pack = require('./package.json');
const { logger } = require('./lib/utils/logger');
const { configure } = require('./lib/commands/configure');
const { verify } = require('./lib/commands/verify');
const { getAllAssigned } = require('./lib/commands/getAllAssigned');
const { getAllSubmitted } = require('./lib/commands/getAllSubmitted');
const { disableCertificateVerification } = require('./lib/options/disableCertificateVerification');
const { readConfig } = require('./lib/utils/readConfig');

program
  .name('mergify')
  .version(pack.version);

const options = [
  {
    trigger: '-s --self-signed',
    description: 'disables the verification of certificates for commands',
    fn: disableCertificateVerification
  }
];

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

  options.forEach(({trigger, description, fn}) => {
    program.option(trigger, description, (...args) => fn(config, ...args));
  });

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
