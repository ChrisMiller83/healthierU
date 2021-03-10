const express = require('express');
const router = express.Router();
const db = require("../models");


router.get("/", (req, res) => {
  res.render("coach-signup", {
    locals: { 
      error: null,
    }
  })
})

module.exports = router;