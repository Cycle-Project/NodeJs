const express = require('express');
const router = express.Router();
const auth = require("../security/middleware/auth.js");

const controller = require('../controllers/users.js');

router.post('/register', controller.postregister);
router.post('/login', controller.postuser);


/**
 *  @description Root Route
 *  @method GET /
 */
router.get('/list', auth, controller.getUsers);

/**
 *  @description add users
 *  @method GET /add-user
 */
router.post('/add-user', auth, controller.createuser)

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.put('/updateuser', auth, controller.update)

router.delete('/deletebyid/:id', auth, controller.delete)

router.delete('/delete/all/users', auth, controller.deleteAll)

router.get('/getbyid/:id', auth, controller.findbyid)

module.exports = router;
