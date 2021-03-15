const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');

//
router.get('/athletes', (req, res) => {
  console.log(req.session.coach)
  console.log(req.session.client)
  db.Client.findAll({
    where: {
      CoachId: req.session.coach.id
    }
  })
  .then((result) => {
    res.json(result)
  })
})

module.exports = router;