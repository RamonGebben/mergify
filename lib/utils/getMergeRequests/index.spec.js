const { getMergeRequests } = require('./index');

describe('getMergeRequests/index', () => {
  it('should fetch merge requests', async() => {
    const mergeRequests = await getMergeRequests();
    expect(mergeRequests).toBeDefined();
  });
});
