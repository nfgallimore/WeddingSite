var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser')
var mongodb = require("mongodb");
var expressMongoDb = require('express-mongo-db');

var indexRouter = require('./routes/index');
var guestbookRouter = require('./routes/guestbook');
var rsvpRouter = require('./routes/rsvp');
var storyRouter = require('./routes/story');
var mapRouter = require('./routes/map');
var registryRouter = require('./routes/registry');

var app = express();

// setup db
var URL = "mongodb://heroku_468pgkzw:rorm346755r9ib2n7t7ls9ej7c@ds055525.mlab.com:55525/heroku_468pgkzw";
app.use(expressMongoDb(URL));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', indexRouter);
app.use('/guestbook', guestbookRouter);
app.use('/rsvp', rsvpRouter);
app.use('/story', storyRouter);
app.use('/map', mapRouter);
app.use('/registry', registryRouter);

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
