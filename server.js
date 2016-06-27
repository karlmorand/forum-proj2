var express = require('express');
var app = express();
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var mongoose = require('mongoose');


app.use('/users', userController);
app.use('/posts', postController);

app.get('/login', function(req, res){//eventually will need to update this to redirect to posts index if user is already logged in (tested by checking session data)
  res.render('login.html.ejs');
})
app.get('/signup', function(req, res){
	res.render('signup.html.ejs');
	});

app.get('/', function(req, res){
  res.render('home.html.ejs')
})

mongoose.connect('mongodb://localhost:27017/forum');
mongoose.connection.once('open', function(){
  console.log('Connected to mongod');
})

app.listen(3000, function(){
  console.log('Server up, listening on port 3000');
})
