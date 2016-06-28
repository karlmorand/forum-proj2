var mongoose = require('mongoose');
var userSchema = require('./usersModel').schema;
var commentSchema = require('./commentsModel').schema;

var postSchema = mongoose.Schema({
  title: String,
  body: String,
  date: Date,
  author: [userSchema],
  comments: [commentSchema]
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
