const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt')


router.get("/register", (req, res) => {
  res.render("coach-signup", {
    locals: { 
      error: null,
    }
  })
});

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

  res.json(newCoach);
})

router.get('/login', (req, res) => {
  res.render('coach-signin', {
    locals: { error: null }
  })
})

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.render('coach-login', {
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
  if (!match) {
    return res.status(401).render('error', {
      locals: { error: 'incorrect password'}
    })
  }
  //set user data on session
  req.body.coach = coach;

  res.json(coach);
})

router.get('/workouts', async (req, res) => {
  res.render('coach-workouts', {
    locals: { error: null }
  })
})

router.post('/workouts', (req, res) => {
  
})

module.exports = router;