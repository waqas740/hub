const path = require("path")
const fs = require("fs");
const yargs = require("yargs");

function loadRCFile(optionsPath) {
    const rcFile = optionsPath || path.resolve(process.cwd(), '.a');
    const rcFileResolved = path.resolve(rcFile);
    return fs.existsSync(rcFileResolved)
        ? JSON.parse(JSON.stringify(require(rcFileResolved)))
        : {};
}
const args = yargs
    .help(false)
    .version(false)
    .config(loadRCFile(yargs.argv.optionsPath));

function getYArgs() {
    return args;
}
function _baseOptions(yargs) {
    return yargs

}

function _underscoreOption(yargs) {
    return yargs
        .option('underscored', {
            describe: "Use snake case for the timestamp's attribute names",
            default: false,
            type: 'boolean'
        });
}

module.exports = { getYArgs, _baseOptions, _underscoreOption }
