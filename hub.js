#!/usr/bin/env node
const { getYArgs } = require('./lib/core/yargs')
const yargs = getYArgs();
const init = require('./lib/commands/init');
const touch = require('./lib/commands/hub-file');
const crud = require('./lib/commands/crud-generator');
const helpers = require('./lib/helpers');
helpers.view.teaser();
const cli = yargs
    .help()
    .version()
    .command('touch', 'create .hub file', touch)
    .command('init', 'Initializes Folders', init)
    .command('init:controller', 'Initializes controllers Folder', init)
    .command('init:route', 'Initializes routes Folder', init)
    .command('init:model', 'Initializes models Folder', init)
    .command(["generate:rc", "generate:RC"], 'Generates controller & route file', crud)
    .command(["generate:controller", "generate:Controller"], 'Generates controller file', crud)
    .command(["generate:route", "generate:Route"], 'Generates route file', crud)
    .wrap(yargs.terminalWidth())
    .strict();

const args = cli.argv;

// if no command then show help
if (!args._[0]) {
    cli.showHelp();
}
