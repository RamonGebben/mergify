const { hasGit } = require('./index');

describe('utils/hasGit', () => {
  test('it has git', async() => {
    const files = [
      'pizza',
      'kebab',
      'sushi',
      '.git'
    ];

    const itHasGit = await hasGit(files);
    expect(itHasGit).toBe(true);
  });
  test('it doesn\'t has git', async() => {
    const files = [
      'pizza',
      'kebab',
      'sushi'
    ];

    const itHasGit = await hasGit(files);
    expect(itHasGit).toBe(false);
  });
});
