'use strict';
const {
  User
} = require("C:/workplace/hub/app/models")
module.exports.getUsers = async (req, res, next) => {
  try {
    const {
      params: {
        id
      }
    } = req;
    let data = null;
    if (id) {
      data = await User.findOne({
        where: {
          id
        }
      })
    } else {
      data = await User.findAll({})
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}
module.exports.createUser = async (req, res, next) => {
  try {
    const {
      body: payload
    } = req;
    let resp = await User.create(payload);
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(400).send(error);
  }
}
module.exports.removeUser = async (req, res, next) => {
  try {
    const {
      params: {
        id
      }
    } = req;
    if (!id) {
      throw "Id is required to remove User "
    }
    let resp = await User.destroy({
      where: {
        id
      }
    });
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(400).send(error);
  }
}
module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: {
        id
      },
      body: payload
    } = req;
    if (!id) {
      throw "Id is required to update User "
    }
    let resp = await User.update(payload, {
      where: {
        id
      }
    });
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(400).send(error);
  }
}