const express = require('express');
const router = express.Router();
const { auth } = require("../security/middleware/auth.js");
const controller = require('../controllers/posts.js');

/**
 *  @description Post post
 *  @method GET /list
 */
router.get('/list', auth, controller.getPosts);

/**
 *  @description Post post
 *  @method GET /list
 */
router.get('/post', auth, controller.getPostById);

/**
 *  @description add post
 *  @method POST /add-post
 */
router.post('/add-post', auth, controller.createpost)

/**
 *  @description for update post
 *  @method PUT /update
 *  @param id post_id
 */
router.put('/update/:id', auth, controller.update)

/**
 *  @description for update post
 *  @method PUT /update
 *  @param id post_id
 */
router.put('/like/:id', auth, controller.like)

/**
 *  @description for update post
 *  @method PUT /update
 *  @param id post_id
 */
router.put('/comment/:id', auth, controller.comment)

/**
 *  @description for delete post 
 *  @method DELETE /deletebyid/:id
 *  @param id post_id
 */
router.delete('/deletebyid/:id', auth, controller.delete)

router.delete('/delete/all', auth, controller.deleteAll)

module.exports = router;