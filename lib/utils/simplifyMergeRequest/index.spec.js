const { path } = require('ramda');
const { simplifyMergeRequest } = require('./index');
const { mrs } = require('./fixtures');
const first = path([0]);

describe('utils/simplifyMergeRequest', () => {
  test('all desired properties are defined', () => {
    const mr = first(mrs);
    expect(simplifyMergeRequest(mr)).toMatchSnapshot();
  });
});
