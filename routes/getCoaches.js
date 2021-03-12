const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const { response } = require('express');



router.get('/', async (req, res) => {
  const data = await db.Coach.findAll();

    res.render("coaches_list", {
      locals: {
        error: null,
        title: "Coaches List", 
        coaches: data
      },
      partials: {
        head: "/partials/head"
      }
    })  
})

module.exports = router

