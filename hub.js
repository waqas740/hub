#!/usr/bin/env node
const { getYArgs } = require('./lib/core/yargs')
const yargs = getYArgs();

const init = require('./lib/commands/init');
const crud = require('./lib/commands/crud-generator');
//import migrationGenerate from './commands/migration_generate';
//import modelGenerate from './commands/model_generate';
const helpers = require('./lib/helpers');

helpers.view.teaser();

const cli = yargs
    .help()
    .version()
    .command('init', 'Initializes project', init)
    .command("crud", 'Generates crud', crud)
    //   .command(['model:generate', 'model:create'], 'Generates a model and its migration', modelGenerate)
    .wrap(yargs.terminalWidth())
    .strict();

const args = cli.argv;

// if no command then show help
if (!args._[0]) {
    cli.showHelp();
}
