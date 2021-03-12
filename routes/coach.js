const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const checkAuth = require('../checkAuthCoach');

router.get('/home', (req, res) => {
  res.render('coach_home', {
    locals: { title: "Coaches Home" },
    partials: { head: 'partials/head_2' }
  })
})

router.get('/coaches', (req, res) => {
  //populate all coaches
})

router.get("/register", (req, res) => {
  res.render("coach-reg", {
    locals: { 
      error: null,
    }
  })
});

//localhost:3000/coach/register
router.post('/register', async (req, res) => {
  const coaches = await db.Coach.findAll({
    where: {
      email: req.body.email
    }
  })
//checks to see if user exists already with email
  if (coaches.length) {
    res.status(422).json({ error: 'email already in use' })
  }

  if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
    return res.status(422).json({error: 'please include all required fields'})
  } 

  const hash = await bcrypt.hash(req.body.password, 10);

  const newCoach = await db.Coach.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash
  })

  // res.json(newCoach);
  .then((result) => {
    res.redirect('/coach/login')
  })
})

router.get('/login', (req, res) => {
  res.render('login', {
    locals: { error: null }
  })
})

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.render('login', {
      locals: {
          error: 'Please submit all required field'
      }
  })
  return;
  }

  const coach = await db.Coach.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!coach) {
    return res.status(404).render('error', {
      locals: { error: 'could not find user with that email'}
    })
  }

  //compare user input and password
  const match = await bcrypt.compare(req.body.password, coach.password)
  //throw error if wrong

  if (match) {
    req.session.coach = coach;
  } else {
    // return res.status(401).render('error', {
    //   locals: { error: 'incorrect password'}
    // })
    res.json({
      error: 'nope'
    })
  }
  //set user data on session
  req.body.coach = coach;

  res.json(coach);
})
//brings to page that has workouts for coach
router.get('/workouts', checkAuth, async (req, res) => {
  res.render('coach-workouts', {
    locals: { error: null }
  })
})

router.delete('/deleteworkout/:id', (req, res) => {
  db.Workout.destroy({
    where: {
      id: req.params.id
    }
  })
})

router.post('/addworkout', async (req, res) => {
  if (!req.body.exercise) {
    return res.status(422).json({
      error: 'please include all required fields'
    })
  } else {
    const newWorkout = await db.Workout.create({
      exercise: req.body.exercise,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight
    })
    res.json(newWorkout)
  }
})

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login');
})

// router.get('/workouts', checkAuth, (req, res) => {
//   const {id} = req.session.client;
//   db.Workout.findAll({
//     where: {id}
//   })
//   .then((workout) => {
//     res.json(workout)
//   })
// })

module.exports = router;