var express = require('express');
var router = express.Router();

// GET all patrons
router.get('/', function(req, res, next) {
  res.render('patrons', {patrons: [], pageTitle: 'Patrons'});
});

// GET Add new patron
router.get('/new', function(req, res, next) {
  res.send('Add new patron.');
});

// PUT Save new patron
router.put('/new', function(req, res, next) {
  res.send('Save new patron.');
});



module.exports = router;
