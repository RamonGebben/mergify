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

  test('returns error when it cannot parse the config', async () => {
    const configPath = `${__dirname}/../../../.config`;

    // Calling console.log because of this;
    // https://github.com/tschaub/mock-fs/issues/234
    console.log();

    mock({
      [configPath]: '<html>,</html>',
    });

    const config = await readConfig();

    return expect(config).toEqual({});
  });

  afterEach(() => {
    mock.restore()
  });
});
