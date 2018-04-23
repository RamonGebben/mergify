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

  test('reading a config with unreadable config', async() => {
    const configPath = `${__dirname}/../../../.config`;

    mock({
      [configPath]: ''
    });

    const expectation = new Error(`
Oh no, \`mergify\` is not configured yet.
Let configure it`);

    await readConfig()
      .catch((err) => {
        expect(err).rejects.toEqual(expectation);
      });
  });

  test('reading a config with no config', async() => {
    const configPath = `${__dirname}/../../../`;

    mock({
      [configPath]: {}
    });

    const expectation = new Error(`
Oh no, \`mergify\` is not configured yet.
Let configure it`);

    await readConfig()
      .catch((err) => {
        expect(err).rejects.toEqual(expectation);
      });
  });

  afterEach(mock.restore);
});
