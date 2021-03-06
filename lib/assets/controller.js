'use strict';
const { <%= name %> } = require("<%= modelPath %>")

module.exports.get<%= name %>s = async (req, res, next) => {
    try {

        const { params: { id } } = req;
        let data = null;
        if (id) {
            data = await <%= name %>.findOne({
                where: {
                    id
                }
            })
        }
        else {
            data = await <%= name %>.findAll({})
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports.create<%= name %> = async (req, res, next) => {
    try {

        const { body: payload } = req;
        let resp = await <%= name %>.create(payload);
        return res.status(200).json(resp);

    } catch (error) {
        return res.status(400).send(error);
    }
}
module.exports.remove<%= name %> = async (req, res, next) => {
    try {

        const { params: { id } } = req;
        if (!id) {
            throw "Id is required to remove <%= name %> "
        }
        let resp = await <%= name %>.destroy({ where: { id } });
        return res.status(200).json(resp);

    } catch (error) {
        return res.status(400).send(error);
    }
}
module.exports.update<%= name %> = async (req, res, next) => {
    try {

        const { params: { id }, body: payload } = req;
        if (!id) {
            throw "Id is required to update <%= name %> "
        }
        let resp = await <%= name %>.update(payload, { where: { id } });
        return res.status(200).json(resp);

    } catch (error) {
        return res.status(400).send(error);
    }
}
