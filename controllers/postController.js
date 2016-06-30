var express = require('express');
var router = express.Router();
var Post = require('../models/postsModel.js');
var User = require('../models/usersModel.js');
var Comment = require('../models/commentsModel.js');
router.use(express.static('public'));


router.get('/', function(req, res){
  Post.find({}, function(err, foundPosts){
      res.render('posts.html.ejs', {posts: foundPosts});
  })

})

router.get('/create', function(req, res){
  res.render('newpost.html.ejs');
})
router.post('/create', function(req, res){
  User.findOne({username: req.session.loggedInUsername}, function(err, foundUser){
    Post.create(req.body, function(err, newPost){
      var postDate = new Date();
      newPost.date = postDate;
      newPost.likes = 0;
      newPost.author.push(foundUser);
      newPost.save(function(err){
          foundUser.posts.push(newPost);
          foundUser.save(function(err){
            console.log(newPost);
            res.redirect('/posts')
        })
      })
    })
  })
})

router.get('/:id', function(req, res){
  Post.findById(req.params.id, function(err, foundPost){
    Comment.find({postID: req.params.id}, function(err, comments){
      res.render('postdetail.html.ejs', {post: foundPost, comments: comments})
    })

  })
})

// router.get('/:id/newcomment', function(req, res){
//   Post.findById(req.params.id, function(err, foundPost){
//     Comment.find({postID: req.params.id}, function(err, comments){
//       res.render('newcomment.html.ejs', {post: foundPost, comments: comments})
//     })
//
//   })
// })
router.get('/:id/like', function(req, res){
  Post.findById(req.params.id, function(err, foundPost){
    foundPost.likes += 1;
    foundPost.save(function(err){
      res.redirect('/posts/'+req.params.id)
    });
  })
})
router.post('/:id/newcomment', function(req, res){
  var commentDate = new Date();
  Comment.create({body: req.body.body, postID: req.params.id, date: commentDate}, function(err, newcomment){
    User.findOne({username: req.session.loggedInUsername}, function(err, foundUser){
      newcomment.author = foundUser;
      Post.findById(req.params.id, function(err, foundPost){
        foundPost.comments.push(newcomment);
        newcomment.save(function(){
        res.redirect('/posts/' + req.params.id);
        })
      })
    })

  })
})
module.exports = router;
