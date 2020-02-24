const helpers = require('./index');
const pluralize = require('pluralize');
const path = require("path")
module.exports = {

  generateFileContent(args, type) {
    let assetPath = ""
    if (type == "controllers") {
      assetPath = 'controller.js'
    }
    else if (type == "routes") {
      assetPath = 'route.js'
    }
    return helpers.template.render(assetPath, {
      name: pluralize.singular(args.name),
    });
  },

  generateFile(args, type) {
    console.log("sas")
    const modelPath = path.resolve(
      path.resolve(process.cwd(), type),
      `${pluralize.singular(args.name)}.${pluralize.singular(type)}.js`
    );
    console.log(modelPath)
    helpers.asset.write(modelPath, this.generateFileContent(args, type));
  },


};
