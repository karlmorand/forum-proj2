var express = require('express');
var app = express();
var userController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');


app.use('/users', userController);
app.use('/posts', postController);


app.get('/', function(req, res){
  res.render('home.html.ejs')
})



app.listen(3000, function(){
  console.log('Server up, listening on port 3000');
})
