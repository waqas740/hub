const { _baseOptions, _underscoreOption } = require('../core/yargs');

const helpers = require('../helpers');
const clc = require('chalk');

exports.builder =
  yargs =>
    _baseOptions(yargs)
      .option('name', {
        describe: 'Defines the name of the new model',
        type: 'string',
        demandOption: true
      })

      .argv;

exports.handler = function (args) {

  try {
    helpers.crud.generateFile(args, "controllers");
    helpers.view.log(
      'New controller was created at',
      //   clc.blueBright(helpers.path.getModelPath(args.name)),
      '.'
    );
  } catch (err) {
    helpers.view.error(err.message);
  }
  process.exit(0);
};

function ensureModelsFolder() {
  if (!helpers.path.existsSync(helpers.path.getModelsPath())) {
    helpers.view.error(
      'Unable to find models path (' +
      helpers.path.getModelsPath() +
      '). Did you run ' + clc.blueBright('sequelize init') + '?'
    );
  }
}

function ensureMigrationsFolder() {
  if (!helpers.path.existsSync(helpers.path.getPath('migration'))) {
    helpers.view.error(
      'Unable to find migrations path (' +
      helpers.path.getPath('migration') +
      '). Did you run ' + clc.blueBright('sequelize init') + '?'
    );
  }
}

function checkModelFileExistence(args) {
  const modelPath = helpers.path.getModelPath(args.name);

  if (args.force === undefined && helpers.model.modelFileExists(modelPath)) {
    helpers.view.notifyAboutExistingFile(modelPath);
    process.exit(1);
  }
}
