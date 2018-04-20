const { Spinner } = require('cli-spinner');

const spinner = new Spinner('Processing.. %s');
spinner.setSpinnerString('|/-\\');

module.exports = {
  spinner
};
