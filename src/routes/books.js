'use strict';
var express = require('express');
var router  = express.Router();

// Databse Models
var Book    = require('../models').Book;
var Patron  = require('../models').Patron;
var Loan    = require('../models').Loan;



/**
 * GET all books
 * /books
 * 
 * Reads all books details in the books table
 */
router.get('/', (req, res, next) => {

  Book.findAll()
      .then((books) => {
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
router.get('/overdue', (req, res, next) => {
  
  let loanQuery = {
    include: [Book, Patron],
    where: {
      return_by: { $lt: new Date() }, // return by date is in the past
      returned_on: null // book not returned yet
    }
  }

  Loan.findAll(loanQuery)
      .then((loans) => {
        let books = loans.map((loan) => loan.Book);
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
router.get('/checked', (req, res, next) => {

  let loanQuery = {
    include: [Book, Patron],
    where: {
      returned_on: null // book not returned yet
    }
  }

  Loan.findAll(loanQuery)
      .then((loans) => {
        let books = loans.map((loan) => loan.Book);
        res.render('books', {books: books, pageTitle: 'Checked out books'});
      });
});



/**
 * GET book details
 * /books/details/:id
 * 
 * Retreives the selected book details and grabs
 * relevant loan and patron details
 */
router.get('/details/:id', (req, res, next) => {

  let bookQuery = {
    where: {
      id: req.params.id // single book by id
    }
  }

  let loanQuery = {
    include: [Book, Patron],
    where: {
      book_id: req.params.id // all loans for book id
    }
  }

  Book.findOne(bookQuery)
      .then((book) => {
        Loan.findAll(loanQuery)
            .then((loans) => {
              res.render('book_details', {book: book, loans: loans});
            });
      });
});



/**
 * GET Add new book
 * /books/new
 * 
 * Loads the new book form
 */
router.get('/new', function(req, res, next) {
  res.render('book_new', {pageTitle: 'New Book'});
});



/////////////// PLACEHOLDERS ///////////////

// PUT Save new book
router.post('/save', function(req, res, next) {
  res.send('Save new book.');
});



module.exports = router;