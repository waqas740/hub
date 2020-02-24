
const helpers = require('../helpers');
const { _baseOptions } = require('../core/yargs');

exports.builder = yargs => _baseOptions(yargs)
    .option('force', {
        describe: 'Will drop the existing config folder and re-create it',
        type: 'boolean',
        default: false
    })
    .argv;

exports.handler = async function (argv) {
    const command = argv._[0];

    switch (command) {
        case 'init':
            await initController(argv);
            await initModels(argv);
            await initRoutes(argv);
            break;
    }

    process.exit(0);
};

function initModels(args) {
    helpers.init.createModelsFolder(false);
}

function initRoutes(args) {
    helpers.init.createRouteFolder(!!args.force);
}

function initController(args) {
    helpers.init.createControlerFolder(!!args.force);
}
