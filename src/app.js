'use strict';
var express    = require('express');
var path       = require('path');
var favicon    = require('serve-favicon');
//var logger     = require('morgan');
var bodyParser = require('body-parser');

// Route handlers
var index      = require('./routes/index');
var books      = require('./routes/books');
var patrons    = require('./routes/patrons');
var loans      = require('./routes/loans');

var app        = express();



/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



/**
 * Assign route handlers
 */
app.use('/', index);
app.use('/books', books);
app.use('/patrons', patrons);
app.use('/loans', loans);



/**
 * Error handling
 */

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Oh dear, this page is missing...');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
