
const helpers = require('../helpers');
const { _baseOptions } = require('../core/yargs');
const fs = require("fs")
const path = require("path")
exports.builder = yargs => _baseOptions(yargs)
    .option('force', {
        describe: 'Will drop the existing .hub file and re-create it',
        type: 'boolean',
        default: false
    })
    .argv;

exports.handler = async function (argv) {
    const command = argv._[0];

    switch (command) {
        case 'touch':
            try {
                let force = !!argv.force
                let filePath = path.resolve(process.cwd(), '.hub');
                if (force && fs.existsSync(filePath) === true) {
                    helpers.view.log('Deleting the .hub file.(--force)');
                    try {
                        fs.unlinkSync(filePath);
                    } catch (e) {
                        helpers.view.error(e);
                    }

                }
                if (fs.existsSync(filePath) === false) {
                    helpers.asset.copy(".hub", filePath);
                    helpers.view.log('Successfully created .hub file at "' + filePath + '".');
                } else {
                    helpers.view.notifyAboutExistingFile(".hub");
                }
            } catch (e) {
                helpers.view.error(e);
            }
            break;
    }

    process.exit(0);
};
