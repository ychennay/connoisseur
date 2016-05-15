var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('localhost', 'gettingstarted');

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var ratings = require('./routes/ratings');
var restaurants = require('./routes/restaurants');
var addRestaurant = require('./routes/addRestaurant');
var addRating = require('./routes/addRating');
var addUser = require('./routes/addUser');
var auth = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

var passportSerialization = require('./passport/serialization');
var passportSignup = require('./passport/signup');
var passportLogin = require('./passport/login');
var passportJwt = require('./passport/jwt');

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());


// GET routes
app.use('/', index);
app.use('/users', users);
app.use('/search', search);
app.use('/ratings', ratings);
app.use('/restaurants', restaurants);

// POST routes
app.use('/auth', auth);
app.use('/addRestaurant', addRestaurant);
app.use('/addRating', addRating);
app.use('/addUser', addUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
