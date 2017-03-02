'use strict';
var express = require('express');
var router  = express.Router();
var moment  = require('moment');

// Database Models
var Book    = require('../models').Book;
var Patron  = require('../models').Patron;
var Loan    = require('../models').Loan;



/**
 * GET all loans
 * /loans
 * 
 * Read all loans details in the loans table
 * and associated book and patron details
 */
router.get('/', function(req, res, next) {
  
  let loanQuery = {
    include: [Book, Patron]
  }

  Loan.findAll(loanQuery)
      .then(function (loans) {
        res.render('loans', {loans: loans, pageTitle: 'Loans'});
      });
});



/**
 * GET overdue loans
 * /loans/overdue
 * 
 * Read all overdue loan details in the loans table
 * and associated book and patron details
 */
router.get('/overdue', function(req, res, next) {

  let loanQuery = {
    include: [Book, Patron],
    where: {
      return_by: { $lt: new Date() },
      returned_on: null
    }
  }

  Loan.findAll(loanQuery)
      .then(function (loans) {
        res.render('loans', {loans: loans, pageTitle: 'Overdue loans'});
      });
});



/**
 * GET checked out loans
 * /loans/checked
 * 
 * Read all checked loan details in the loans table
 * and associated book and patron details
 */
router.get('/checked', (req, res, next) => {

  let loanQuery = {
    include: [Book, Patron],
    where: {
      returned_on: null 
    }
  }

  Loan.findAll(loanQuery)
      .then((loans) => {
        res.render('loans', {loans: loans, pageTitle: 'Checked out loans'});
      });
});



/**
 * GET loan details
 * /loans/return/:id
 * 
 * Retreives loan details for specified ID
 */
router.get('/return/:id', (req, res, next) => {

  let loanQuery = {
    include: [Book, Patron],
    where: {
      id: req.params.id // only one loan by id
    }
  }

  Loan.findOne(loanQuery)
      .then((loan) => {
        res.render('loan_return', {loan: loan, pageTitle: 'Return Book'});
      });
});



/**
 * GET Add new loan
 * /loans/new
 * 
 * Loads the add new loan form with 'loaned on' and
 * 'return by' dates preselected
 */
router.get('/new', (req, res, next) => {

  let loan = Loan.build({
    loaned_on: moment().format('YYYY-MM-DD'),
    return_by: moment().add(7, 'days').format('YYYY-MM-DD')
  });

  renderNewLoan(res, loan);

});



/**
 * POST Save new loan
 * /loans/new
 * 
 * Saves the new loan to database while handling
 * any validation errors
 */
router.post('/new', (req, res, next) => {

  Loan.create(req.body) // create a new loan and redirect
      .then((loan) => { // to loans index page
        res.redirect('/loans');
      })
      .catch((err) => { // or show error messages
        if (err.name === 'SequelizeValidationError') {
          let loan = Loan.build(req.body);
          renderNewLoan(res, loan, err);
        }
        else res.send(500);
      });
});



/**
 * Helper for rendering the new loan form
 */
function renderNewLoan(res, loan, err) {
    
  Book.findAll() // get all the books
      .then((books) => { 
        Patron.findAll() // get all the patrons
              .then((patrons) => { 
                res.render('loan_new', {
                    loan: loan,
                    books: books,
                    patrons: patrons,
                    errors: err ? err.errors : [],
                    pageTitle: 'New Loan'
                  }
                );
              });
      });
}


module.exports = router;
