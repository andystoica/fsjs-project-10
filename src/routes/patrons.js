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

// GET patron details
router.get('/details/:id', function(req, res, next) {
  res.render('patron_details', {patron: {}, loans: [], pageTitle: 'Patron details'});
});

// GET Add new patron
router.get('/new', function(req, res, next) {
  res.render('patron_new', {pageTitle: 'New Patron'});
});



// PUT Save new patron
router.put('/new', function(req, res, next) {
  res.send('Save new patron.');
});



module.exports = router;
