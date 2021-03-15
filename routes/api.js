const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');

// gets athletes for coach logged in
router.get('/athletes', (req, res) => {
  db.Client.findAll({
    where: {
      CoachId: req.session.coach.id
    },
    include: {
      model: db.Workout
    }
  })
  .then((result) => {
    res.json(result)
  })
})

router.post('/athletes/:client', async (req, res) => {
  // const workout = await db.Client.findAll({
  //   where: {
  //     CoachId: req.session.coach.id
  //   }
  // })

  db.Workout.create({
    exercise: req.body.exercise,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    ClientId: req.params.client
  })
  .then((result) => {
    res.json(result)
  })
})





// get atheltes workouts for coach logged in
// router.get('/workout/:id', (req, res) => {
//   db.Workout.findAll({
//     where: {
//       ClientId: req.params.id
//     }
//   })
//   .then((result) => {
//     res.json(result)
//   })
// })
module.exports = router;