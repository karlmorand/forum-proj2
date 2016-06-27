var mongoose = require('mongoose');
// var postSchema = require('./postsModel.js').schema;

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  posts: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;
