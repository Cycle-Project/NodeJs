const express = require('express');
const router = express.Router();

const controller = require('../controllers/posts.js');

/**
 *  @description Post post
 *  @method GET /list
 */
router.get('/list', controller.getPosts);

/**
 *  @description add post
 *  @method POST /add-post
 */
router.post('/add-post', controller.createpost)

/**
 *  @description for update post
 *  @method PUT /update
 *  @param id post_id
 */
router.put('/update/:id', controller.update)

/**
 *  @description for delete post 
 *  @method DELETE /deletebyid/:id
 *  @param id post_id
 */
router.delete('/deletebyid/:id', controller.delete)

router.delete('/delete/all', controller.deleteAll)

module.exports = router;