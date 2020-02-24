const helpers = require('./index');
const pluralize = require('pluralize');
const path = require("path");
const { loadRCFile } = require('../core/yargs');
const fs = require('fs')
String.prototype.toFLUpperCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
module.exports = {

  generateFileContent(args, type) {
    if (type == "controllers") {
      return this.generateControllerFile(args)
    }
    else if (type == "routes") {
      return this.generateRouteFile(args)
    }

  },

  generateFile(args, type) {
    this.checkFileExistence(args, type)
    var modelPath = path.resolve(
      loadRCFile()[pluralize.plural(type)],
      `${pluralize.singular(args.name).toLowerCase()}.${pluralize.singular(type)}.js`
    );

    helpers.asset.write(modelPath, this.generateFileContent(args, type));
    helpers.view.log(
      `New ${pluralize.singular(args.name).toLowerCase()}.${pluralize.singular(type)} was created at ${modelPath}`
    );
  },
  generateControllerFile(args) {
    let modelPath = path.resolve(loadRCFile().model)
    const modelPathArr = modelPath.split("\\");

    modelPath = modelPathArr.length ? modelPathArr.join('/') : modelPath;

    return helpers.template.render("controller.js", {
      name: pluralize.singular(args.name).toFLUpperCase(),
      modelPath: modelPath

    });
  },

  generateRouteFile(args) {

    let controllerPath = path.resolve(loadRCFile().controllers)
    const controllerPathArr = controllerPath.split("\\");
    controllerPath = controllerPathArr.length ? controllerPathArr.join('/') : controllerPath;

    return helpers.template.render("route.js", {
      name: pluralize.singular(args.name).toFLUpperCase(),
      controllerPath,
      model: pluralize.plural(args.name).toLowerCase()

    });
  },
  checkFileExistence(args, type) {
    let force = !!args.force;

    let newFileName = `${pluralize.singular(args.name).toLowerCase()}.${pluralize.singular(type)}.js`
    var filePath = path.resolve(
      loadRCFile()[pluralize.plural(type)],
      newFileName
    );
    if (!force && fs.existsSync(filePath) === true) {
      helpers.view.notifyAboutExistingFile(newFileName);
    }
    if (force && fs.existsSync(filePath) === true) {
      helpers.view.log(`Deleting the ${newFileName} file.(--force)`);
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        helpers.view.error(e);
      }

    }

  }


};
