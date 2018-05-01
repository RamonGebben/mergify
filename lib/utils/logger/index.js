const chalk = require('chalk');

const Logger = {
  log : (...args) =>{
    console.log(...args);
  },
  
  warn : (...args) =>{
    console.log('⚠️', chalk.yellow.bold(...args));
  },
  
  err : (...args) =>{
    console.log('🙀', chalk.red.bold(...args));
  }

};

module.exports = {
  logger: Logger
}
