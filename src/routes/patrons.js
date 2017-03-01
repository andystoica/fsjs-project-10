'use strict';
var express = require('express');
var router  = express.Router();

// Database Models
var Book    = require('../models').Book;
var Patron  = require('../models').Patron;
var Loan    = require('../models').Loan;



/**
 * GET all patrons
 * /patrons
 * 
 * Reads all patrons details from the patrons table
 */
router.get('/', (req, res, next) => {
  
  Patron.findAll()
        .then((patrons) => {
          res.render('patrons', {patrons: patrons, pageTitle: 'Patrons'});
        });
});



/**
 * GET patron details
 * /patrons/details/:id
 * 
 * Retreives the selected patron details and grabs
 * relevant loan and book details
 */
router.get('/details/:id', (req, res, next) => {

  let patronQuery = {
    where: {
      id: req.params.id // single patron by id
    }
  }

  let loanQuery = {
    include: [Book, Patron],
    where: {
      patron_id: req.params.id // all loans for patron id
    }
  }

  Patron.findOne(patronQuery)
        .then((patron) => {
          Loan.findAll(loanQuery)
              .then((loans) => {
                res.render('patron_details', {patron: patron, loans: loans});
              });
        });
});



/////////////// PLACEHOLDERS ///////////////

// GET Add new patron
router.get('/new', (req, res, next) => {
  res.render('patron_new', {pageTitle: 'New Patron'});
});

// PUT Save new patron
router.put('/new', (req, res, next) => {
  res.send('Save new patron.');
});



module.exports = router;
