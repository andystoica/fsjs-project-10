'use strict';

/**
 * /patrons             - GET  | lists all patrons
 * /patrons/details/:id - GET  | details of individual patron with loan history
 * /patrons/details/:id - POST | updates patron details and handles validation
 * /patrons/new         - GET  | empty form for adding a new patron
 * /patrons/new         - POST | creates a new patron record and handles validation
 * 
 * renderNewPatron(res, patron, err) - Helper for rendering new patron form
 * renderUpdatePatronDetails(res, patron, err) - Helper for rendering patron details form
 */

var express = require('express');
var router  = express.Router();
var utils   = require('./utilities');

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

  let search  = req.query.search ? req.query.search : '';
  let pageNum = req.query.page ? req.query.page : 1;
  let offset  = (pageNum - 1) * utils.perPage;

  let patronQuery = {
    limit:  utils.perPage,
    offset: offset,
    where: {
      $or: [ // add other fields if required
        { first_name: { $like: '%' + search + '%' } },
        { last_name:  { $like: '%' + search + '%' } },
        { library_id: { $like: '%' + search + '%' } } 
      ]
    }
  };
  
  Patron.findAndCountAll(patronQuery)
        .then((results) => {
          res.render('patrons', {
              baseUrl:    '/patrons',
              patrons:    results.rows,
              pageTitle:  'Patrons',
              pageLinks:  utils.pageLinks(pageNum, results.count, search),
              pageSearch: search
            });
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

  Patron.findById(req.params.id)
      .then((patron) => {
        renderUpdatePatronDetails(res, patron);
      });
});



/**
 * POST save patron details
 * /patron/details/:id
 * 
 * Saves the selected patron details and
 * handles any validation errros
 */
router.post('/details/:id', (req, res, next) => {

  Patron.findById(req.params.id)
        .then((patron) => { // update patron record
          return patron.update(req.body)
        })
        .then((patron) => { // redirect to book listing page
          res.redirect('/patrons')
        })
        .catch((err) => { // handle validation errors
          if (err.name === 'SequelizeValidationError') {
            let patron = Patron.build(req.body);
            renderUpdatePatronDetails(res, patron, err);
          }
          else res.send(500);
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



/**
 * Helper for rendering the Patron Detail page
 * by fetching loan history for that particular patron
 */
function renderUpdatePatronDetails(res, patron, err) {
  
  let loanQuery = {
    include: [Book, Patron],
    where: {
      patron_id: patron.id // all loans for patron id
    }
  }

  Loan.findAll(loanQuery)
      .then((loans) => {
        res.render('patron_details', {
            patron: patron,
            loans: loans,
            errors: err ? err.errors : [],
          }
        );
      });
}



module.exports = router;
