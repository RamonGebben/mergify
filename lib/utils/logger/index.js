const chalk = require('chalk');

var Logger = function(){};

Logger.prototype.log = function(...args) {
  console.log(...args);
}

Logger.prototype.warn = function(...args) {
  console.log('\n⚠️', chalk.yellow.bold(...args));
}

Logger.prototype.err = function(...args) {
  console.log('\n🙀', chalk.red.bold(...args));
}

module.exports = {
  logger: new Logger()
}
