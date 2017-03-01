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



/**
 * GET Add new patron
 * /patrons/new
 * 
 * Loads the new patrons form
 */
router.get('/new', (req, res, next) => {
  let patron = Patron.build();
  renderNewPatron(res, patron);
});

/**
 * POST Save new patron
 * /patrons/new
 */ 
router.post('/new', (req, res, next) => {
  Patron.create(req.body)
      .then((patron) => {
        res.redirect('/patrons');
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          let patron = Patron.build(req.body);
          renderNewPatron(res, patron, err);
        }
        else res.send(500);
      });
});

/**
 * Helper for rendering the New Patron page
 */
function renderNewPatron(res, patron, err) {
  res.render('patron_new', {
      patron: patron,
      errors: err ? err.errors : [],
      pageTitle: 'New Patron'
    }
  )
}


module.exports = router;
