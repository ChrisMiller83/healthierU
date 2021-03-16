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
const getAthletesRouter = require('./routes/getAthletes');
const getWorkoutsRouter = require('./routes/workouts');
const getLogoutRouter = require('./routes/logout');
const methodOverride = require('method-override');


const meal_plansRouter = require('./routes/meal_plans');
const athlete_meal_plansRouter = require('./routes/athlete_meal_plans');



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
app.use(methodOverride('_method'));
app.use('/', indexRouter);
app.use('/athlete', athleteRouter);
app.use('/coach', coachRouter);
app.use('/coaches_list', getCoachesRouter);
app.use('/athletes_list', getAthletesRouter);
app.use('/workouts', getWorkoutsRouter);
app.use('/logout', getLogoutRouter);

app.use('/meal_plans', meal_plansRouter);
app.use('/athlete_meal_plans', athlete_meal_plansRouter);



module.exports = app;
