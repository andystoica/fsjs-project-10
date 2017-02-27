var express = require('express');
var router = express.Router();

// GET all loans
router.get('/', function(req, res, next) {
  res.render('loans', {loans: [], pageTitle: 'Loans'});
});

// GET overdue loan
router.get('/overdue', function(req, res, next) {
  res.render('loans', {loans: [], pageTitle: 'Overdue loans'});
});

// GET checked out loans
router.get('/checked', function(req, res, next) {
  res.render('loans', {loans: [], pageTitle: 'Checked out loans'});
});

// GET Add new loan
router.get('/new', function(req, res, next) {
  res.send('Add new loan.');
});

// PUT Save new loan
router.put('/new', function(req, res, next) {
  res.send('Save new loan.');
});



module.exports = router;
