const Post = require('../models/Post');
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};


// @desc  Create a store
// @access Public
exports.createpost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    return res.status(201).json({
      success: true,
      data: post, Date

    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This post already exists' });
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

  Post.updateOne(
    req.params.id,
    new Post(req.body),
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
    } else res.send({ message: `post was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({}, (err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all post."
      });
    else return res.send({ message: `All Users were deleted successfully!` });
  });
};




