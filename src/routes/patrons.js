var express = require('express');
var router = express.Router();
var Patron = require('../models').Patron;

/**
 * GET all patrons
 * /patrons
 * 
 * Reads all patrons details from the patrons table
 */
router.get('/', function(req, res, next) {
  
  Patron.findAll()
        .then(function (patrons) {
          res.render('patrons', {patrons: patrons, pageTitle: 'Patrons'});
        });
});



/////////////// PLACEHOLDERS ///////////////

// GET Add new patron
router.get('/new', function(req, res, next) {
  res.send('Add new patron.');
});

// PUT Save new patron
router.put('/new', function(req, res, next) {
  res.send('Save new patron.');
});



module.exports = router;
