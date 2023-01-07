const { Router } = require('express');
const express = require('express');
const router = express.Router();
const auth = require("../security/middleware/auth.js");
const controller = require('../controllers/route.js');

/**
 *  @description Root Route
 *  @method GET /
 */
router.get('/list', auth, controller.getRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
router.post('/add-route', controller.createRoute)

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.put('/update/:id', controller.update)

router.delete('/deletebyid/:id', controller.delete)

router.delete('delete/all/route/', controller.deleteAll)

module.exports = router;