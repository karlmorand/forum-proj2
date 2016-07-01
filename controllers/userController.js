var express = require('express');
var router = express.Router();
var User = require('../models/usersModel.js');
var bcrypt = require('bcrypt');

router.use(express.static('public'));


router.get('/login', function(req, res){
  req.session.failure = "";
  res.render('login.html.ejs', {failure: req.session.failure, activeUser: ''});
})

router.post('/login', function(req,res){
  User.findOne({username: req.body.username}, function(err, foundUser){
    if (foundUser === null) {
      req.session.failure = 'username';
      res.render('login.html.ejs', {failure: req.session.failure, activeUser: ''});
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.loggedInUsername = foundUser.username;
        res.redirect('/');
      } else {
        req.session.failure = 'password';
        res.render('login.html.ejs', {failure: req.session.failure, activeUser: ''});
    }
  }
  })
})

router.get('/signup', function(req, res){
	res.render('signup.html.ejs', {failure: "", activeUser: ''});
	});

router.post('/signup', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  console.log(req.body.username);
  User.findOne({username: req.body.username}, function(err, foundUser){
    if (foundUser === null) {
      User.create(req.body, function(err, user){
        req.session.loggedInUsername = req.body.username
        res.redirect('/posts')
      })
    } else {
    req.session.failure = 'username taken';
    res.render('signup.html.ejs', {failure: 'username taken', activeUser:''})
    }
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
    if (req.session.loggedInUsername !== undefined) {
      User.findOne({username: req.session.loggedInUsername}, function(err, activeUser){
    res.render('author.html.ejs', {user: foundUser, activeUser: activeUser});
      })
    } else {res.render('author.html.ejs', {user: foundUser, activeUser: ''});}
  })
})
module.exports = router;
