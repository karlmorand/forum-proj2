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
    console.log('NEW USER:');
    console.log(user);
    res.send('new user created');
  })
})

router.get('/logout', function(req, res){
  //removes the user session to logout the user and redirects them to the homepage
  req.session.destroy(function(err){
    console.log('Destroyed the user session');
    res.redirect('/')
  })
})

module.exports = router;
