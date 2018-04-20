const {
  readConfig
} = require('./index');

const mock = require('mock-fs');

describe('utils/readConfig', () => {
  test('reading a config', async() => {
    const configPath = `${__dirname}/../../../.config`;

    const stub = {
      userId: 42,
      domain: 'gitlab.com',
      privateToken: '90809657890'
    };

    mock({
      [configPath]: JSON.stringify(stub)
    });

    const config = await readConfig();

    return expect(config).toEqual(stub);
  });

  afterEach(mock.restore);
});
