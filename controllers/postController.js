var express = require('express');
var router = express.Router();
var Post = require('../models/postsModel.js');
var User = require('../models/usersModel.js');
var Comment = require('../models/commentsModel.js');
router.use(express.static('public'));



router.get('/', function(req, res){
  Post.find().sort({likes: -1}).exec(function(err, foundPosts){
    if (req.session.loggedInUsername !== undefined) {
      User.findOne({username: req.session.loggedInUsername}, function(err, foundUser){
      res.render('posts.html.ejs', {posts: foundPosts, activeUser: foundUser});
      })
    } else {
    res.render('posts.html.ejs', {posts: foundPosts, activeUser: ''});
    }
  })

})

router.get('/create', function(req, res){
  if (req.session.loggedInUsername !== undefined) {
    User.findOne({username: req.session.loggedInUsername}, function(err, foundUser){
  res.render('newpost.html.ejs', {activeUser: foundUser});
  })
} else {
  res.redirect('/posts');
}
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
  var canEdit = false;
  if (req.session.loggedInUsername !== undefined) {
    User.findOne({username: req.session.loggedInUsername}, function(err, foundUser){
      Post.findById(req.params.id, function(err, foundPost){
        Comment.find({postID: req.params.id}, function(err, comments){
      if (foundPost.author[0].username === req.session.loggedInUsername) {
        canEdit = true;
      } else {canEdit = false};
        res.render('postdetail.html.ejs', {post: foundPost, comments: comments, canEdit: canEdit, activeUser: foundUser})
        })
      })
    })
  } else {
    Post.findById(req.params.id, function(err, foundPost){
      Comment.find({postID: req.params.id}, function(err, comments){
    res.render('postdetail.html.ejs', {post: foundPost, comments: comments, canEdit: false, activeUser:''})
  })
})
}
})


router.get('/:id/edit', function(req, res){
  var canEdit = false;
  Post.findById(req.params.id, function(err, foundPost){
    Comment.find({postID: req.params.id}, function(err, comments){
      if (foundPost.author[0].username === req.session.loggedInUsername) {
        canEdit = true;
      } else {canEdit = false};
      if (req.session.loggedInUsername !== undefined) {
      User.findOne({username: req.session.loggedInUsername}, function(err, foundUser){
        res.render('postedit.html.ejs', {post: foundPost, comments: comments, canEdit: canEdit, activeUser: foundUser})
      })
    } else {res.render('postedit.html.ejs', {post: foundPost, comments: comments, canEdit: canEdit, activeUser: ''})
            }
    })
  })
})

router.post('/:id/edit', function(req, res){
  Post.findById(req.params.id, function(err, foundPost){
    foundPost.body = req.body.body;
      foundPost.save(
        res.redirect('/posts/'+req.params.id)
      )
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
