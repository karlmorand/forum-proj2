var express = require('express');
var app = express();
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var session = require('express-session');
var port = process.env.PORT || 3000;

var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/forum-project'
app.use(session({
  secret: "purplecorsica",
  resave: false,
  saveUninitialized: false
}));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', userController);
app.use('/posts', postController);

app.get('/', function(req, res){
      res.redirect('/posts');
    });

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
  console.log('Connected to mongod');
})

app.listen(port, function(){
  console.log('Server up, listening');
})
