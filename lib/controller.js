var pluralize = require('pluralize');
module.exports = (model) => {
    const modelPlural = pluralize.plural(model)
    const modelSiggular = pluralize.singular(model)


}