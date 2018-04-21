const { access, constants } = require('fs');
const { promisify } = require('util');
const accessAsync = promisify(access);

async function checkConfigExists() {
    try {
        const configFileName = `${__dirname}/../../../.config`;
        await accessAsync(configFileName, constants.F_OK);
        return true;
    }
    catch(_){
        return false;
    }
}

module.exports = {
    checkConfigExists
};
