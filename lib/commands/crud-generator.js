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
      }).option('force', {
        describe: 'Will drop the existing .hub file and re-create it',
        type: 'boolean',
        default: false
      })

      .argv;

exports.handler = function (args) {

  try {
    helpers.crud.generateFile(args, "controllers");
    helpers.crud.generateFile(args, "routes");

  } catch (err) {
    helpers.view.error(err.message);
  }
  process.exit(0);
};
