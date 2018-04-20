const fetch = require('node-fetch');
const {
  doFetch
} = require('./index');

const mock = require('mock-fs');

describe('utils/doFetch', () => {
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
