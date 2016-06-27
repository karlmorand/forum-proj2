var express = require('express');
var app = express();
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var session = require('express-session');

app.use(session({
  secret: "purplecorsica",
  resave: false,
  saveUninitialized: false
}));


app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', userController);
app.use('/posts', postController);


app.get('/', function(req, res){
  if (req.session.loggedInUsername !== undefined) {
    res.redirect('/posts');
  } else {
    res.render('home.html.ejs')
  }
});

mongoose.connect('mongodb://localhost:27017/forum');
mongoose.connection.once('open', function(){
  console.log('Connected to mongod');
})

app.listen(3000, function(){
  console.log('Server up, listening on port 3000');
})
