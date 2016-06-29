var express = require('express');
var app = express();
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var session = require('express-session');
var port = process.env.PORT || 3000;

var mongoDBURI = process.env.MONGODB_URI || 'mongodb://heroku_q82969fx:g2ok88jhluq1af7o1etjfu583r@ds023674.mlab.com:23674/heroku_q82969fx'
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
  if (req.session.loggedInUsername !== undefined) {
    res.redirect('/posts');
  } else {
    res.render('home.html.ejs')
  }
});

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
  console.log('Connected to mongod');
})

app.listen(port, function(){
  console.log('Server up, listening');
})
