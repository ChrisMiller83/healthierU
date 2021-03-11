var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const es6Renderer = require('express-es6-template-engine');
const db = require('./models');

var indexRouter = require('./routes/index');
var athleteRouter = require('./routes/athlete');
const coachRouter = require('./routes/coach')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.use('/', indexRouter);
app.use('/athlete', athleteRouter);
app.use('/coach', coachRouter)

module.exports = app;
