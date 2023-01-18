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
}

exports.getPostById = async (req, res, next) => {
  try {
    '?id=:id&routeId=:routeId&userId=:userId'
    var post;
    if (req.query.id) {
      post = await Post.findOne({ _id: req.query.id })
    } else if (req.query.routeId) {
      post = await Post.findOne({ routeId: req.query.routeId })
    } else if (req.query.userId) {
      post = await Post.findOne({ comments: { $in: { userMadeId: req.query.userId } } })
    } else {
      throw new Error('No query')
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}


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

exports.like = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "UserId must be provided!"
    });
  }
  if (!req.params.id) {
    return res.status(400).send({
      message: "PostId can not be empty!"
    });
  }
  let likedPersonId = req.body
  const post = await Post.findOne({ _id: req.params.id });

  Post.updateOne(
    { _id: req.params.id },
    post.likes.indexOf(likedPersonId) === -1
      ? { $push: { likes: likedPersonId } }
      : { $pull: { likes: likedPersonId } },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found Post with id ${req.params.id}.`
          });
        } else {
          return res.status(500).send({
            message: "Error updating Post with id " + req.params.id
          });
        }
      } else res.send(data)
    }
  )
}

exports.comment = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Comment must be provided!"
    });
  }
  if (!req.params.id) {
    return res.status(400).send({
      message: "PostId can not be empty!"
    });
  }
  let newComment = {
    comment: req.body['comment'],
    userMadeId: req.body['userMadeId'],
  }

  Post.updateOne(
    { _id: req.params.id },
    { $push: { comments: newComment } },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found Post with id ${req.params.id}.`
          });
        } else {
          return res.status(500).send({
            message: "Error updating Post with id " + req.params.id
          });
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Post.deleteOne(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Post with id ${req.params.id}.`
        });
      } else {
        return res.status(500).send({
          message: "Could not delete Post with id " + req.params.id
        });
      }
    } else res.send({ message: `post was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Post.deleteMany({}, (err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all post."
      });
    else return res.send({ message: `All Posts were deleted successfully!` });
  });
};




