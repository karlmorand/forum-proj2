var mongoose = require('mongoose');
var userSchema = require('./usersModel').schema;

var commentSchema = mongoose.Schema({
  postID: String,
  body: String,
  author: String
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;