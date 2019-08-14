const { find, isNil } = require('ramda');

const hasGit = files => !isNil(find(f => f === '.git', files));

module.exports = {
  hasGit
};
