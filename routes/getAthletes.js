const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const { response } = require('express');



router.get('/', async (req, res) => {
  const data = await db.Client.findAll();

  res.render("athletes_list", {
    locals: {
      error: null,
      title: "Athletes List",
      athletes: data
    },
    partials: {
      head: "/partials/head"
    }
  })
})

module.exports = router
