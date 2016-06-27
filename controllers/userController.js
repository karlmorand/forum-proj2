var express = require('express');
var router = express.Router();
var User = require('../models/usersModel.js');
var bcrypt = require('bcrypt');


router.get('/', function(req, res){
  res.send('Users index page');
})

router.get('/login', function(req, res){
  res.render('login.html.ejs');
})
router.post('/login', function(req,res){
  //search mongodb for the user and password
  User.findOne({username: req.body.username}, function(err, foundUser){
    console.log(foundUser);
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.loggedInUsername = foundUser.username;
      res.redirect('/');
    } else {
      res.alert('incorrectet username or password');
    }
  })
})

router.get('/signup', function(req, res){
	res.render('signup.html.ejs');
	});

router.post('/signup', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, user){
    req.session.loggedInUsername = req.body.username
    res.redirect('/posts')
  })
})

router.get('/logout', function(req, res){
  //removes the user session to logout the user and redirects them to the homepage
  req.session.destroy(function(err){
    console.log('Destroyed the user session');
    res.redirect('/')
  })
})

router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, foundUser){
    res.render('author.html.ejs', {user: foundUser});
  })
})
module.exports = router;
