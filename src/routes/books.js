var express = require('express');
var router = express.Router();

// GET all books
router.get('/', function(req, res, next) {
  res.render('books', {books: [], pageTitle: 'Books'});
});

// GET overdue books
router.get('/overdue', function(req, res, next) {
  res.render('books', {books: [], pageTitle: 'Overdue books'});
});

// GET checked out books
router.get('/checked', function(req, res, next) {
  res.render('books', {books: [], pageTitle: 'Checked out books'});
});

// GET Add new book
router.get('/new', function(req, res, next) {
  res.send('Add new book.');
});

// PUT Save new book
router.put('/new', function(req, res, next) {
  res.send('Save new book.');
});



module.exports = router;
