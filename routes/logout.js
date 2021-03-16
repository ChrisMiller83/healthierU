const express = require('express');
const router = express.Router();
const db = require("../models");
const checkAuth = require('../checkAuthClient');


router.get('/', (req, res) => {
  req.session.client = null;
  req.session.coach = null;
  res.redirect('/');
})

module.exports = router;