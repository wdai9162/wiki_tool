var express = require('express');
var router = express.Router();
var db = require("../MongoDB/connect")
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

module.exports = router;
