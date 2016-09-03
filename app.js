var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var compression = require('compression');

//custom imports
var settings = require('./settings');
var dir = settings.paths;

//app init
var app = express();

// view engine setup
app.set('view engine', 'html');
nunjucks.configure((dir.views), {
  autoescape: true,
  express: app
});

/* ---- Middle wares ---- */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(dir.static))
app.disable('x-powered-by');


/* ---- Routes ---- */
app.use('/', require(dir.routes + 'index.js'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({"oops":404})
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message)
    res.status(404).render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.message)
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
