## HUB

**Genearte Basic CRUD Operation for Express app with sequelize ORM**


## Installation

```sh
$ npm install -g  hub
```

## Commands

commands  | Description
------------- | -------------
hub touch  | Create hub file in which you can set controller, route & model folder path.
hub init |  Create controllers,routes,models folder in your application
hub init:controller  |  Create controllers folder in your application
hub init:route |  Create routes folder in your application
hub init:model |  Create models folder in your application
hub generate:rc |  Create controllers & routes file with baisc crud operations.This command requires name(the name of the model) option. e.g `hub generate:rc  --name=User`
hub generate:route |   Create routes file with baisc crud operations..This command requires name(the name of the route & controller) option. e.g `hub generate:route  --name=User`
hub generate:controller |  Create controllers  file with baisc crud operations.This command requires name(the name of the controller) option. e.g `hub generate:controller  --name=User`

## Commands Demo
> **hub touch**

This command will create .hubrc file in root directory of application.
```bash
const path = require('path');

module.exports = {
'controllers': path.resolve('', 'controllers'),
'routes': path.resolve('', 'routes'),
'models': path.resolve('', 'models')
}

```
> **hub generate:rc --name=User**

This command will create two file one will be route file in routes folder with name ```user-route.js``` and second one will be controllers file in controller folder with name  ```user-controller.js``` in your application.

user-route.js code will be like
```bash
const router = require('express').Router();
const UserCtrl = require('./controllers/user-controller');
router.get('/users/:id', UserCtrl.getUser);
router.get('/users', UserCtrl.getUser);
router.post('/users', UserCtrl.createUser);
router.put('/users/:id', UserCtrl.updateUser);
router.delete('/users/:id', UserCtrl.removeUser);
module.exports = router;
```
user-controller.js code will be like
```bash
'use strict';
const {
  User
} = require("./models")
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
```
