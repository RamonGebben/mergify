const { pick } = require('ramda');

const simplifyMergeRequest = pick([
  'title',
  'id',
  'iid',
  'target_branch',
  'source_branch',
  'state',
  'author',
  'assignee',
  'web_url',
  'merge_status'
]);

module.exports = {
  simplifyMergeRequest
};
