const chalk = require('chalk');

const getLogger = function(transport){
  return {
    log : (...args) =>{
      transport.log(...args);
    },
    
    warn : (...args) =>{
      transport.log('⚠️', chalk.yellow.bold(...args));
    },
    
    err : (...args) =>{
      transport.log('🙀', chalk.red.bold(...args));
    }
  }
}

module.exports = {
  logger: getLogger(console),
  getLogger: getLogger
}
