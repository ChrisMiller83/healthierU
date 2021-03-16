const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const checkAuth = require('../checkAuthCoach');

//redners coach home page on log in
router.get('/home', (req, res) => {
  res.render('coach-hub', {
    locals: { title: "Coaches Home" },
    partials: { head: '/partials/head_2' }
  })
})

router.get('/coaches', (req, res) => {
  //populate all coaches
})

// renders coach register page
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
    res.status(422).render('coach-reg', {
      locals: { error: 'email already in use' }
    })
  }
// checks to make sure all fields are entered
  if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
    return res.status(422).render('coach-reg', {
      locals: {error: 'please include all required fields'}
    })
  } 
// hashes passwords
  const hash = await bcrypt.hash(req.body.password, 10);
//creates new coach and assigs it to variable
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
//renders login page
router.get('/login', (req, res) => {
  res.render('coach_login', {
    locals: { error: null }
  })
})
//allows someone to log in and creates session for them
router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.render('coach_login', {
      locals: {
          error: 'Please submit all required field'
      }
  })
  return;
  }
//checks to see if coach exists in db
  const coach = await db.Coach.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!coach) {
    return res.status(404).render('coach_login', {
      locals: { error: 'could not find user with that email'}
    })
  }

  //compare user input and password
  const match = await bcrypt.compare(req.body.password, coach.password)
  //throw error if wrong

  if (match) {
    req.session.coach = coach;
  } else {
    return res.status(401).render('coach_login', {
      locals: { error: 'incorrect password' }
    })
  }
  //set user data on session
  req.body.coach = coach;

  res.redirect("/coach/athletes");
});

//brings to page that has workouts for coach
router.get('/workouts', checkAuth, async (req, res) => {
  res.render('coach_workouts', {
    locals: { error: 'there are no workouts available' }
  })
})

//deletes workout by workoutid
router.delete('/deleteworkout/:id', (req, res) => {
  db.Workout.destroy({
    where: {
      id: req.params.id
    }
  })
})

//allows you to edit one workout 
router.put('/editworkout/:id', (req, res) => {
  db.Workout.findByPk(req.params.id)
  .then((result) => {
    result.exercise = req.body.exercise
    result.sets = req.body.sets
    result.reps = req.body.reps
    result.weight = req.body.weight
    return result.save()
  })
  .then((response) => {
    res.json('working')
  })
})

//allows coach to create workout and add it to db
router.post('/addworkout', async (req, res) => {
  if (!req.body.exercise) {
    return res.status(422).render('workout', {
      locals: {
        error: 'please include all required fields'
      }
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
// creates workout for client
router.post('/athletes/:client', async (req, res) => {

  db.Workout.create({
    exercise: req.body.exercise,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    ClientId: req.params.client
  })
  .then((result) => {
    res.redirect(`/coach/athletes/${req.params.client}`)
  })
})
// gets athletes that are assigned to coach by id
router.get('/athletes', async (req, res) => {
  const data = await db.Client.findAll({
    where: {
      CoachId: req.session.coach.id
    },
    include: {
      model: db.Workout
    }
  })
    res.render("coach-hub", {
      locals: { 
        error: null,
        title: "Coach Home",
        athletes: data
      },
      partials: {
        head: 'partials/head'
      }
  })
})

router.get('/athletes/:client', async (req, res) => {
  const data = await db.Client.findOne({
    where: {
      CoachId: req.session.coach.id,
      id: req.params.client
    },
    include: {
      model: db.Workout
    }
  })
    res.render("coach_athletes", {
      locals: { 
        error: null,
        title: "Coach Home",
        athlete: data
      },
      partials: {
        head: 'partials/head'
      }
  })
})

// allows user to logout
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/home');
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