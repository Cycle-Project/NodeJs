const user = require('../models/user');
const User = require('../models/user')

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users   
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    };


// @desc  Create a store
// @access Public
exports.createuser = async (req, res, next) => {
    try {
      const user = await User.create(req.body);
  
      return res.status(201).json({
        success: true,
        data: user, Date
        
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'This user already exists' });
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
  
    Tutorial.updateById(
      req.params.id,
      new user(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user with id " + req.params.id
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };
  
  // Delete all Tutorials from the database.
  exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Users."
        });
      else res.send({ message: `All Users were deleted successfully!` });
    });
  };




