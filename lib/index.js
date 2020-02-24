// const argv = require('minimist')(process.argv.slice(2));
// const createHubFile = require("./hubFile");
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







// const initArgKey = Object.keys(argv)[0];
// argv[initArgKey] = argv[initArgKey].map(arg => arg.toLowerCase());

// if (argv[initArgKey].indexOf("init") > -1) {
//     createHubFile(argv[initArgKey].indexOf("force") > -1);

// }
