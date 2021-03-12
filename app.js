var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const es6Renderer = require('express-es6-template-engine');
const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize });
var indexRouter = require('./routes/index');
var athleteRouter = require('./routes/athlete');
const coachRouter = require('./routes/coach');
const getCoachesRouter = require('./routes/getCoaches');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'pancakes', // used to sign the cookie
    resave: false, // update session even w/ no changes
    saveUninitialized: false, // always create a session
    cookie: { 
      secure: false,
      maxAge: 2592000
    },
    store: store,
  }))
store.sync()
// app.use((req, res, next) => {
//   console.log('=========user======');
//   console.log(req.session.coach);
//   console.log('======user======');
//   next();
// })
app.use(express.static(path.join(__dirname, 'public')));
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.use('/', indexRouter);
app.use('/athlete', athleteRouter);
app.use('/coach', coachRouter);
app.use('/coaches_list', getCoachesRouter);

module.exports = app;
