const express = require('express');
const router = express.Router();

const controller = require('../controllers/image.js');

/**
 *  @description Post image
 *  @method GET /list
 */
router.get('/list', controller.getimage);

/**
 *  @description add image
 *  @method POST /add-post
 */
router.post('/add-image', controller.createimage)

/**
 *  @description for update image
 *  @method PUT /update
 */

module.exports = router;