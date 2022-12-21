const express = require('express');
const router = express.Router();

const controller = require('../controllers/posts');

/**
 *  @description Root Route
 *  @method GET /
 */
router.get('/list', controller.getPosts);

/**
 *  @description add users
 *  @method GET /add-user
 */
router.post('/add-post', controller.createpost)

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.put('/update', controller.update)

router.delete('/deletebyid/:id', controller.delete)

router.delete('delete/all/posts/', controller.deleteAll)

module.exports = router;