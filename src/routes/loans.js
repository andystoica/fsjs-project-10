'use strict';
var express = require('express');
var router  = express.Router();

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
 * Retreives the list of all books and patrons
 * and populates the new loan form
 */
router.get('/new', (req, res, next) => {

  Book.findAll()
      .then((books) => {
        Patron.findAll()
              .then((patrons) => {
                res.render('loan_new', {books: books, patrons: patrons, pageTitle: 'New Loan'});
              });
      });  
});



/////////////// PLACEHOLDERS ///////////////

// PUT Save new loan
router.put('/new', (req, res, next) => {
  res.send('Save new loan.');
});



module.exports = router;
