var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send('Posts index page');
})


module.exports = router;
