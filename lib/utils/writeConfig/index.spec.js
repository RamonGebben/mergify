const {
  writeConfig
} = require('./index');
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);

const mock = require('mock-fs');

describe.only('utils/writeConfig', () => {
  test('writing a config', async() => {
    const configPath = `${__dirname}/../../../.config`;
    mock({
      [configPath]: ''
    });

    const config = {
      userId: 42,
      domain: 'gitlab.com',
      privateToken: '90809657890'
    };

    await writeConfig(config);

    const newContent = await readFileAsync(configPath, 'utf8');

    return expect(JSON.parse(newContent)).toEqual(config);
  });

  afterEach(mock.restore);
});
