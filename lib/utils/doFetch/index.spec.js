const fetch = require('node-fetch');
const {
  doFetch
} = require('./index');

const mock = require('mock-fs');

describe('utils/doFetch', () => {
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

  test('it can fetch', async() => {
    const mockResponse = [
      {
        id: '123',
        sha: 'gfhjewrdhibj'
      }
    ];

    fetch.mockResponse(JSON.stringify(mockResponse));
    const resp = await doFetch('users');

    return expect(resp).toEqual(mockResponse);
  });

  afterEach(mock.restore);
});
