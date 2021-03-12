const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');
// const checkAuth = require('../checkAuthCoach');
// const { builtinModules } = require('module');

router.get('/allworkouts', async (req, res) => {
  const data = await db.Workout.findAll()

  console.log(data)
  res.render('coach_workouts', {
    locals: {
      workout: data,
      title: "Workout List"
    },
    partials: {
      head: "/partials/head"
    }
  })
})

module.exports = router;