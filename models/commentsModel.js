var mongoose = require('mongoose');
var userSchema = require('./usersModel').schema;


var commentSchema = mongoose.Schema({
  post: String,
  body: String,
  author: [userSchema]
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
