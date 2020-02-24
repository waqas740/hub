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
