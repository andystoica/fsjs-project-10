var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
