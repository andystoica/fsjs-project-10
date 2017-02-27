var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.findAll().then((books) => {console.log(books)});
  res.end();
  console.log('GET / Home page');
});

module.exports = router;
