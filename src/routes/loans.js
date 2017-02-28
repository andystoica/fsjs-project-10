var express = require('express');
var router = express.Router();
var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;



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
router.get('/checked', function(req, res, next) {
  
  let loanQuery = {
    include: [Book, Patron],
    where: {
      returned_on: null 
    }
  }

  Loan.findAll(loanQuery)
      .then(function (loans) {
        res.render('loans', {loans: loans, pageTitle: 'Checked out loans'});
      });
});




/////////////// PLACEHOLDERS ///////////////


// GET Add new loan
router.get('/new', function(req, res, next) {
  res.send('Add new loan.');
});

// PUT Save new loan
router.put('/new', function(req, res, next) {
  res.send('Save new loan.');
});



module.exports = router;
