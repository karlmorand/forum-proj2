var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userController);
app.use('/postController', postController);


app.get('/', function(req, res){
  res.render('home.html.ejs')
})



app.listen(3000, function(){
  console.log('Server up, listening on port 3000');
})
