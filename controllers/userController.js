var express = require('express');
var router = express.Router();
var User = require('../models/usersModel.js');
var bcrypt = require('bcrypt');


router.get('/', function(req, res){
  res.send('Users index page');
})

router.get('/login', function(req, res){//eventually will need to update this to redirect to posts index if user is already logged in (tested by checking session data)
  res.render('login.html.ejs');
})
router.post('/login', function(req,res){
  //search mongodb for the user and password
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


module.exports = router;
