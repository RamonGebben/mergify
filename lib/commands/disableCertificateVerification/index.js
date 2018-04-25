const { logger } = require('../../utils/logger');
const chalk = require('chalk');

const disableCertificateVerification = async() => {
    logger.log(chalk.red.bold('⚠️ Disabling certificate verification. This is unsafe and should only be used as last resort.'));
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return;
};

module.exports = {
    disableCertificateVerification
};
  