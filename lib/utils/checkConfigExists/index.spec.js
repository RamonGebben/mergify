const { checkConfigExists } = require('./index.js');
const mock = require('mock-fs');

describe('utils/checkConfigExists', () => {
  it('should return true when checking an existing config', async() => {
    const configPath = `${__dirname}/../../../.config`;
    mock({
      [configPath]: ''
    });

    const fileExists = await checkConfigExists();

    return expect(fileExists).toEqual(true);
  });

  it('should return false when not configured', async() => {
    mock({
    });

    const fileExists = await checkConfigExists();

    return expect(fileExists).toEqual(false);
  });

  afterEach(mock.restore);
});
