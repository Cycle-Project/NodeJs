const User = require('../models/user.js');
const FriendRequest = require('../models/friend_request.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postregister = (async (req, res, next) => {
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

exports.postlogin = ("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

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
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.findbyid = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Error occured. FindById."
      });
    else res.send(data)
  });
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

  console.log(req.body);

  User.updateOne(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          return res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  User.deleteOne(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        return res.status(500).send({
          message: "Could not delete user with id " + req.params.id
        });
      }
    } else return res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({}, (err) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    else return res.send({ message: `All Users were deleted successfully!` });
  });
};

exports.getFriends = async (req, res, next) => {
  try {
    // find the user
    const user = await User.findOne({ _id: req.params.id })

    // get friends as user[] from their id's
    const friends = await User.find({ '_id': { $in: user.friends } })

    return res.status(200).json({
      success: true,
      count: friends.length,
      data: friends
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getRequests = async (req, res, next) => {
  try {
    // find the user
    const requests = await FriendRequest.find()

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Delete all Tutorials from the database.
exports.removeFriend = async (req, res) => {
  try {
    // find the user
    const user = await User.findOne({ _id: req.params.id })
    const fuser = await User.findOne({ _id: req.params.fid })

    if (!user || !fuser || !user.friends || !fuser.friends) {
      return res.status(404).send({
        message: `Not found one or more User(s)`
      });
    }

    user.friends = user.friends.filter(e => e !== req.params.fid)
    fuser.friends = fuser.friends.filter(e => e !== req.params.id)

    User.updateOne(
      { _id: req.params.id },
      { friends: user.friends },
      (err, data) => {
        if (err)
          return res.status(500).send({
            message:
              err.message || "Some error occurred while removing friend"
          });
      },
    );

    User.updateOne(
      { _id: req.params.fid },
      { friends: fuser.friends },
      (err, data) => {
        if (err)
          return res.status(500).send({
            message:
              err.message || "Some error occurred while removing friend"
          });
      },
    );
    return res.send({ message: `Friend removed successfully!` });
  } catch (err) {
    console.log(err)
  }
};