var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const expressLayout = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', 'layouts/default')

// Setup logger parser and many more
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  // next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Middleware default variable 
var setDefault = (req, res, next) => {
  res.locals.contentName = "Default";
  next();
}

// Routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
app.use(indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter)

module.exports = app;
