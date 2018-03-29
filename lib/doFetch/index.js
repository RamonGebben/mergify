const fetch = require('node-fetch');

const {
  GITLAB_PRIVATE_TOKEN
} = process.env;

const fetchOptions = {
  headers: {
    'PRIVATE-TOKEN': GITLAB_PRIVATE_TOKEN,
  }
};

function doFetch(path) {
  return fetch(`https://gitlab.com/api/v4/${path}`, fetchOptions)
    .then(res => res.json());
}

module.exports = {
  doFetch
};
