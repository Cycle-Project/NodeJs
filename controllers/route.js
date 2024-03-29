const Route = require('../models/Route.js');

exports.getRoutes = async (req, res, next) => {
    try {
        const routes = await Route.find();

        return res.status(200).json({
            success: true,
            count: routes.length,
            data: routes
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getRoutesOf = async (req, res, next) => {
    try {
        if (!req.params.id) {
            throw new Error('User id is null!')
        }
        const routes = await Route.find({ userMadeId: req.params.id });

        return res.status(200).json({
            success: true,
            count: routes.length,
            data: routes
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// @desc  Create a route
// @access Public
exports.createRoute = (req, res, next) => {
    Route.create(req.body,
        (err, data) => {
            if (err) {
                console.error(err);
                if (err.code === 11000) {
                    return res.status(400).json({ error: 'This route already exists' });
                }
                return res.status(500).json({ error: 'Server error' });
            } else return res.status(201).json({
                success: true,
                data: data
            });
        }
    );
};

/**
 * @description add new position to positions array of route
 * @param id route_id
 * @body position 
 */
exports.addPosition = async (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            message: "Route_id is missing!"
        });
    }

    try {
        let route = await Route.findOne({ _id: req.params.id });

        const newPosition = {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            altitude: req.body.altitude,
            city: req.body.city,
        }
        // append new position
        route.positions = [...route.positions, newPosition]

        await Route.updateOne(
            { _id: req.params.id },
            { positions: route.positions },
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        return res.status(404).send({
                            message: `Not found Route with id ${req.params.id}.`
                        });
                    } else {
                        return res.status(500).send({
                            message: "Error updating Route with id " + req.params.id
                        });
                    }
                } else return res.status(201).json({
                    success: true,
                    data: data
                });
            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            message: "Route_id is missing!"
        });
    }

    Route.updateOne(
        req.params.id,
        new Route(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found Route with id ${req.params.id}.`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating Route with id " + req.params.id
                    });
                }
            } else return res.status(201).json({
                success: true,
                data: data
            });
        }
    );
};

exports.delete = (req, res) => {
    Route.deleteOne(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Route with id ${req.params.id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete Route with id " + req.params.id
                });
            }
        } else return res.send({ message: `route was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Route.deleteMany({}, (err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all route."
            });
        else return res.send({ message: `All Routes were deleted successfully!` });
    });
};




