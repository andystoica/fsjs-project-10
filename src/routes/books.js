'use strict';

/**
 * /books             - GET  | lists all books
 * /books/overdue     - GET  | lists all overdue books
 * /books/checked     - GET  | lists all cheked out books
 * /books/details/:id - GET  | details of an individual book
 * /books/details/:id - POST | updates details of an individual book
 * /books/new         - GET  | empty form for adding a new book
 * /books/new         - POST | creates a new book and handles validation errors
 * 
 * renderUpdateBookDetails(res, book, err) - Helper for rendering the update book form
 * renderNewBook(res, book, err) - Helper for rendering the new book form
 */

var express = require('express');
var router  = express.Router();

// Databse Models
var Book    = require('../models').Book;
var Patron  = require('../models').Patron;
var Loan    = require('../models').Loan;
var perPage = 5;



/**
 * GET all books
 * /books
 * 
 * Reads all books details in the books table
 */
router.get('/', (req, res, next) => {

  let pageNum = req.query.page ? req.query.page : 1;
  let offset  = (pageNum - 1) * perPage;
  let search  = req.query.search ? req.query.search : '';

  let bookQuery = {
    limit:  perPage,
    offset: offset,
    where: {
      $or: [
        { title:  { $like: '%' + search + '%' } },
        { author: { $like: '%' + search + '%' } },        
      ]
    }
  };

  Book.findAndCountAll(bookQuery)
      .then((results) => {
        res.render('books', {
            books:     results.rows,
            pageTitle: 'Books',
            search:    search,
            pageNum:   pageNum,
            pageTotal: Math.ceil(results.count / perPage)
          });
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

  Book.findById(req.params.id)
      .then((book) => {
        renderUpdateBookDetails(res, book);
      });
});



/**
 * POST save book details
 * /books/details/:id
 * 
 * Saves the selected book details and
 * handles any validation errros
 */
router.post('/details/:id', (req, res, next) => {

  Book.findById(req.params.id)
      .then((book) => { // update book record
        return book.update(req.body)
      })
      .then((book) => { // redirect to book listing page
        res.redirect('/books')
      })
      .catch((err) => { // handle validation errors
        if (err.name === 'SequelizeValidationError') {
          let book = Book.build(req.body);
          renderUpdateBookDetails(res, book, err);
        }
        else res.send(500);
      });
});



/**
 * GET Add new book
 * /books/new
 * 
 * Loads the new book form
 */
router.get('/new', function(req, res, next) {
  let book = Book.build();
  renderNewBook(res, book);
});

/**
 * POST Save new book
 * /books/new
 */
router.post('/new', function(req, res, next) {
  Book.create(req.body)
      .then((book) => {
        res.redirect('/books');
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          let book = Book.build(req.body);
          renderNewBook(res, book, err);
        }
        else res.send(500);
      });
});



/**
 * Helper for rendering the Book Details page
 * by fetching loan history for that particular book
 */
function renderUpdateBookDetails(res, book, err) {

  let loanQuery = {
    include: [Book, Patron],
    where: {
      book_id: book.id // all loans for book id
    }
  }

  Loan.findAll(loanQuery)
      .then((loans) => {
        res.render('book_details', {
            book: book,
            loans: loans,
            errors: err ? err.errors : [],
          }
        );
      });
}



/**
 * Helper for rendering the New Book page
 */
function renderNewBook(res, book, err) {
  res.render('book_new', {
      book: book,
      errors: err ? err.errors : [],
      pageTitle: 'New Book'
    }
  );
}



module.exports = router;
