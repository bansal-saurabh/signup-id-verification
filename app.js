/**
 * Copyright 2022 https://saurabhbansal.me
 * @author Saurabh Bansal
 */

require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var verificationRouter = require('./routes/verification');
var successRouter = require('./routes/success');

var mediaImageController = require('./controllers/mediaImageController');
var mediaJsonController = require('./controllers/mediaJsonController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'dummy-secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', signupRouter);
app.use('/signup', signupRouter);
app.use('/verification', verificationRouter);
app.use('/success', successRouter);

app.use('/mediaImage', mediaImageController);
app.use('/mediaJson', mediaJsonController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
