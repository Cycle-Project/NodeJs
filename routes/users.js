const express = require('express');
const router = express.Router();
const auth = require("../security/middleware/auth.js");

const controller = require('../controllers/users.js');

router.post('/register', controller.postregister);
router.post('/login', controller.postlogin);

/**
 *  @description User user
 *  @method GET /list
 */
router.get('/list', auth, controller.getUsers)

router.get('/getbyid/:id', auth, controller.findbyid)

/**
 *  @description add users
 *  @method POST /add-user
 */
router.post('/add-user', auth, controller.createuser)

/**
 *  @description for update user
 *  @method PUT /update
 *  @param id user_id
 */
router.put('/update/:id', auth, controller.update)

/**
 *  @description for delete user 
 *  @method DELETE /deletebyid/:id
 *  @param id ıser_id
 */
router.delete('/deletebyid/:id', auth, controller.delete)

router.delete('/delete/all', auth, controller.deleteAll)

/**
 *  @description for user's friend list
 *  @method GET /get-friends
 *  @param id user_id
 */
router.get('/get-friends/:id', auth, controller.getFriends)

/**
 *  @description for remove friend from user
 *  @method DELETE /update
 *  @param id user_id
 *  @param fid firend_user_id
 */
router.delete('/remove-friend/:id/:fid', auth, controller.removeFriend)


module.exports = router;
