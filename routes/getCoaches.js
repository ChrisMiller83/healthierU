const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.render("coaches_list", {
    locals: {
      error: null,
      title: "Coaches List",      
    },
    partials: {
      head: "/partials/head"
    }
  });
})

module.exports = router

