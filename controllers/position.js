const Position = require('../models/Position.js');


exports.getPosition = async (req, res, next) => {
    try {
        const position = await Position.find();

        return res.status(200).json({
            success: true,
            count: position.length,
            data: position
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


// @desc  Create a store
// @access Public
exports.createPosition = async (req, res, next) => {
    try {
        const position = await Position.create(req.body);
        return res.status(201).json({
            success: true,
            data: position


        });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This position already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Route.updateById(
        req.params.id,
        new position(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found position with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating position with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Position.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found position with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete position with id " + req.params.id
                });
            }
        } else res.send({ message: `position was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Position.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all position."
            });
        else res.send({ message: `All position were deleted successfully!` });
    });
};




