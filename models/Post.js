const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const CommentValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 140],
    message: 'Comment must not exceed {ARGS[1]} characters.'
  })
];

// Define the database model
const PostSchema = new mongoose.Schema({
  comments: {
    type: [{
      comment: {
        type: String,
        required: false,
        validate: CommentValidator
      },
      userMadeId: {
        type: String,
        required: false,
      },
    }],
    required: false,
  },
  likes: {
    type: [String],
    required: false
  },
  routeId: {
    type: String,
    required: [false, 'Route is not required.'],
  }
}
);

// Use the unique validator plugin
PostSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

module.exports = mongoose.model('post', PostSchema);