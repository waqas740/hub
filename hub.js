#!/usr/bin/env node
const { getYArgs } = require('./lib/core/yargs')
const yargs = getYArgs();
const init = require('./lib/commands/init');
const touch = require('./lib/commands/hub-file');
const crud = require('./lib/commands/crud-generator');
const helpers = require('./lib/helpers');
helpers.view.teaser();
const path = require("path");
console.log(yargs.argv);
return 0;
const cli = yargs
    .help()
    .version()
    .command('touch', 'create .hub file', touch)
    .command('init', 'Initializes Folders', init)
    .command("crud", 'Generates crud operation', crud)
    .wrap(yargs.terminalWidth())
    .strict();

const args = cli.argv;

// if no command then show help
if (!args._[0]) {
    cli.showHelp();
}
