const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);

async function readConfig() {
  const configFileName = `${process.cwd()}/.config`;
  try {
    const config = await readFileAsync(configFileName, 'utf8');
    return JSON.parse(config);
  } catch(_) {
    console.log(`
Oh no, \`mergify\` is not configured yet.
Let configure it
`);
    return {};
  }
}

module.exports = {
  readConfig
};
