const fs = require('fs');
const path = require('path').resolve(process.cwd(), '.hub');
const chalk = require('chalk');
module.exports = (force = false) => {
    try {
        if (force) {
            writeData(path);
            return;
        }
        fs.open(path, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log(chalk.red(".hub file is already created. please try with force e.g init force"))
                    return;
                }
                throw err;
            }

            writeData(fd);
        });
    } catch (err) {
        console.error(err)
    }
}
const writeData = (fd) => {
    const dataStr = `const path = require('path');

module.exports = {
'controllers': path.resolve('app', 'controllers'),
'routes': path.resolve('app', 'routes'),
'model': path.resolve('', 'models')
}`;
    const data = new Uint8Array(Buffer.from(dataStr))

    fs.writeFile(fd, data, (err) => {
        if (err) throw err;
        console.log(chalk.green('.hub file has been created!'));
    });
}
