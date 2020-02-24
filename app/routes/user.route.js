const router = require('express').Router();
const UserCtrl = require('C:/workplace/hub/app/controllers');
router.get('/users/:id', UserCtrl.getUser);
router.get('/users', UserCtrl.getUser);
router.post('/users', UserCtrl.createUser);
router.put('/users/:id', UserCtrl.updateUser);
router.delete('/users/:id', UserCtrl.removeUser);
module.exports = router;