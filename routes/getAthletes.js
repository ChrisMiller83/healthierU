const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.render("athletes_list", {
    locals: {
      error: null,
      title: "Athletes List",
    },
    partials: {
      head: "/partials/head_2"
    }
  });
})

module.exports = router
