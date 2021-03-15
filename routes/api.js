const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');


router.get('/athletes', async (req, res) => {
  console.log(req.session.coach)
  console.log(req.session.client)
  const data = await db.Client.findAll({
    where: {
      CoachId: req.session.coach.id
    }
  })
    res.render("coach_home", {
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


module.exports = router