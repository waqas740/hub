const helpers = require('./index');
const path = require('path');
const fs = require('fs');
const { loadRCFile } = require('../core/yargs')
function createFolder(folderName, folder, force) {
    if (force && fs.existsSync(folder) === true) {
        helpers.view.log('Deleting the ' + folderName + ' folder. (--force)');

        try {
            fs.readdirSync(folder).forEach(filename => {
                fs.unlinkSync(path.resolve(folder, filename));
            });
        } catch (e) {
            helpers.view.error(e);
        }

        try {
            fs.rmdirSync(folder);
            helpers.view.log('Successfully deleted the ' + folderName + ' folder.');
        } catch (e) {
            helpers.view.error(e);
        }
    }

    try {
        if (fs.existsSync(folder) === false) {
            helpers.asset.mkdirp(folder);
            helpers.view.log('Successfully created ' + folderName + ' folder at "' + folder + '".');
        } else {
            helpers.view.log(folderName + ' folder at "' + folder + '" already exists.');
        }
    } catch (e) {
        helpers.view.error(e);
    }
};

const init = {
    createControlerFolder: force => {
        createFolder('controllers', loadRCFile().controllers, force);
    },

    createRouteFolder: force => {
        createFolder('routes', loadRCFile().routes, force);
    },

    createModelsFolder: force => {
        createFolder('models', loadRCFile().model, false);
    },


};

module.exports = init;
module.exports.default = init;
