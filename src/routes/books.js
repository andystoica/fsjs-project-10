var express = require('express');
var router = express.Router();
var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;



/**
 * GET all books
 * /books
 * 
 * Reads all books details in the books table
 */
router.get('/', function(req, res, next) {

  Book.findAll()
      .then(function (books) {
        res.render('books', {books: books, pageTitle: 'Books'});
      });
});



/**
 * GET overdue books
 * /books/overdue
 * 
 * Reads all overbook loans from the loans table
 * then updates the table with the corresponding book details
 */
router.get('/overdue', function(req, res, next) {
  
  let loanQuery = {
    include: [Book, Patron],
    where: {
      return_by: { $lt: new Date() }, // return by date is in the past
      returned_on: null // book not returned yet
    }
  }

  Loan.findAll(loanQuery)
      .then(function (loans) {
        books= loans.map((loan) => loan.Book);
        res.render('books', {books: books, pageTitle: 'Overdue books'});
      });
});



/**
 * GET checked out books
 * /books/checked
 * 
 * Reads all checkout loans from the loans table
 * then updates the table with the corresponding book details
 */
router.get('/checked', function(req, res, next) {

  let loanQuery = {
    include: [Book, Patron],
    where: {
      returned_on: null // book not returned yet
    }
  }

  Loan.findAll(loanQuery)
      .then(function (loans) {
        books = loans.map((loan) => loan.Book);
        res.render('books', {books: books, pageTitle: 'Checked out books'});
      });
});



/////////////// PLACEHOLDERS ///////////////


// GET Add new book
router.get('/new', function(req, res, next) {
  res.send('Add new book.');
});

// PUT Save new book
router.put('/new', function(req, res, next) {
  res.send('Save new book.');
});



module.exports = router;