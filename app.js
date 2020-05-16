var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testApiRouter = require('./routes/testApi');

import Connection from './Connection';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function middleWare(req, res, next) {
  if(req.method === 'GET') {
        let pool = new Connection().pool;
        pool.query(`create database if not exists posts`);
        // add more queries that will create the tables. (e.g. create table if not exists table_name)
  }

  next();
}

app.use(middleWare);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testApi', testApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
