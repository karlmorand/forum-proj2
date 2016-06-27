var mongoose = require('mongoose');
var userSchema = require('./usersModel').schema
var postSchema = mongoose.Schema({
  title: String,
  body: String,
  author: [userSchema]
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
