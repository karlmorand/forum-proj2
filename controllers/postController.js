var express = require('express');
var router = express.Router();
var Post = require('../models/postsModel.js');
var User = require('../models/usersModel.js');


router.get('/', function(req, res){
  res.send('Posts index page');
})

router.get('/create', function(req, res){
  res.render('newpost.html.ejs');
})
router.post('/create', function(req, res){
  User.findOne({username: req.session.loggedInUsername}, function(err, foundUser){
    Post.create(req.body, function(err, newPost){
      newPost.author.push(foundUser)
      newPost.save(function(err){
          foundUser.posts.push(newPost);
          foundUser.save(function(err){
            console.log(newPost);
        })
      })
    })
  })
})

module.exports = router;
