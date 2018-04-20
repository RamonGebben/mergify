const fetch = require('node-fetch');
const { readConfig } = require('../readConfig');

async function doFetch(path) {
  const config = await readConfig();

  const {
    privateToken,
    domain
  } = config;

  const fetchOptions = {
    headers: {
      'PRIVATE-TOKEN': privateToken
    }
  };

  return fetch(`https://${domain}/api/v4/${path}`, fetchOptions)
    .then(res => res.json());
}

module.exports = {
  doFetch
};
