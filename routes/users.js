const { Router } = require('express');
const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.js');

/**
 *  @description Root Route
 *  @method GET /
 */
router.get('/list', controller.getUsers);

/**
 *  @description add users
 *  @method GET /add-user
 */
router.post('/add-user', controller.createuser)

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.put('/updateuser', controller.update)

router.delete('/deletebyid/:id', controller.delete)

router.delete('delete/all/users/', controller.deleteAll)

module.exports = router;