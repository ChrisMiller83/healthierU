const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const checkAuth = require('../checkAuthClient');

// renders athlete register page
router.get("/register", (req, res) => {
  res.render("athlete-reg", {
    locals: { 
      error: null,
    }
  })
});

// register page for athletes 
router.post('/register', async (req, res) => {
  const clients = await db.Client.findAll({
    where: {
      email: req.body.email
    }
  })
//checks to see if client exists already with email
  if (clients.length) {
    res.status(422).json({ error: 'email already in use' })
  }
// checks to see all fields were filled out
  if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
    return res.status(422).json({error: 'please include all required fields'})
  } 
// hashes password
  const hash = await bcrypt.hash(req.body.password, 10);
// create new client and assign it to variable
  const newclient = await db.Client.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash
  })

  // res.json(newclient);
  .then((result) => {
    res.redirect('/athlete/login')
  })
})
// renders home page and runs middleware 
router.get('/home', checkAuth, (req, res) => {
  res.render('athlete_home', {
    locals: { title: "Athlete Home" },
    partials: {head: 'partials/head'}
  })
})
// renders login page
router.get('/login', (req, res) => {
  res.render('login', {
    locals: { error: null }
  })
})
// lets athlete user login and creates session
router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.render('login', {
      locals: {
          error: 'Please submit all required field'
      }
  })
  return;
  }
// checking to make sure clients email isnt taken
  const client = await db.Client.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!client) {
    return res.json( {
      error: 'could not find client with that email'}
    )
  }

  //compare client input and password
  const match = await bcrypt.compare(req.body.password, client.password)
  //throw error if wrong
  if (match) {
    req.session.client = client;
  } else {
    // return res.status(401).render('error', {
    //   locals: { error: 'incorrect password'}
    // })
    res.json({
      error: 'nope'
    })
  }
  // renders athlete based on their id and renders their page
  res.redirect(`/athlete/:${client.id}`)
})
// renders all workouts - might not need this in athlete page
router.get('/allworkouts', checkAuth, (req, res) => {
  db.Workout.findAll()
  .then((workout) => {
    res.json(workout)
  })
})
// displays workot based on workout id
router.get('/:id', (req, res) => {
  const {id} = req.session.client;
  db.Workout.findOne({
    where: {id}
  })
  .then((workout) => {
    res.json(workout)
  })
})

//set workouts
router.get('/workouts/:id', checkAuth, (req, res) => {
  const client = req.session.client;
  db.Workout.findByPk(req.params.id)
  .then((workout) => {
    if (!workout) {
      res.status(404).json({
        error: 'client has no workouts'
      })
    } else {
        db.Client.findByPk(req.session.client.id)
        .then((client) => {
          client.setWorkout(workout)
        })
    }
  })
})
// assigns coach to athlete based on coach id
router.get('/setcoach/:id', checkAuth, (req, res) => {
  db.Coach.findByPk(req.params.id)
  .then((coach) => {
    if (!coach) {
      res.status(404).json({
        error: 'could not find a coach with that id'
      })
    } else {
      db.Client.findByPk(req.session.client.id)
      .then((client) => {
        client.setCoach(coach)
        res.redirect()
      })
    }
  })
})

// logout function
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login');
})

module.exports = router;


