var express = require('express');
var app = express();
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));

app.use('/users', userController);
app.use('/posts', postController);


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
