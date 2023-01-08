const express = require('express');
const router = express.Router();
const auth = require("../security/middleware/auth.js");
const controller = require('../controllers/route.js');

/**
 *  @description Route route
 *  @method GET /list
 */
router.get('/list', auth, controller.getRoutes);

/**
 *  @description add route
 *  @method POST /add-route
 */
router.post('/create-route', controller.createRoute)

/**
 *  @description add position to route
 *  @method PUT /add-position
 *  @param id route_id
 *  @body position
 */
router.put('/add-position/:id', controller.addPosition)

/**
 *  @description for update route
 *  @method PUT /update
 *  @param id route_id
 */
router.put('/update/:id', controller.update)

/**
 *  @description for delete route 
 *  @method DELETE /deletebyid/:id
 *  @param id route_id
 */
router.delete('/deletebyid/:id', controller.delete)

router.delete('/delete/all', controller.deleteAll)

module.exports = router;