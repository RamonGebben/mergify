const fetch = require('node-fetch');
const { getMergeRequests } = require('./index');

describe('utils/getMergeRequests', () => {
  it('should fetch merge requests', async() => {
    const mockResponse = [
      {
        id: '123',
        sha: 'gfhjewrdhibj'
      }
    ];

    fetch.mockResponse(JSON.stringify(mockResponse));

    const mergeRequests = await getMergeRequests({});
    expect(mergeRequests).toEqual(mockResponse);
  });
});
