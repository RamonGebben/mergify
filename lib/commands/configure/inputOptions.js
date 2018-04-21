module.exports = {
  inputOptions: [
    {
      type: 'input',
      name: 'userId',
      message: 'What is your Gitlab User ID?'
    },
    {
      type: 'password',
      name: 'privateToken',
      message: 'What private token shall we use?'
    },
    {
      type: 'input',
      name: 'domain',
      default: 'gitlab.com',
      message: 'On what domain is your Gitlab instance?'
    }
  ]
};
