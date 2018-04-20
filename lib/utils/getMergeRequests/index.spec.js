const fetch = require('node-fetch');
const { getMergeRequests } = require('./index');
const mock = require('mock-fs');

describe('utils/getMergeRequests', () => {
  beforeEach(() => {
    const configPath = `${__dirname}/../../../.config`;
    const stub = {
      userId: 42,
      domain: 'gitlab.com',
      privateToken: '90809657890'
    };

    mock({
      [configPath]: JSON.stringify(stub)
    });
  });

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

  afterEach(mock.restore);
});
