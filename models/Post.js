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

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed {ARGS[1]} characters.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Email must be valid.'
  })
];


// Define the database model
const PostSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [false, 'comment  is not required.'],
    validate: CommentValidator
  },
  like: {
    type: String,
   
   
   //validate: emailValidator
  },
 
  share: {
    type:Array
  },
}
);

// Use the unique validator plugin
PostSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('post', PostSchema);