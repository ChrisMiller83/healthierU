const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt')


router.get("/register", (req, res) => {
  res.render("athlete-reg", {
    locals: { 
      error: null,
    }
  })
});

router.post('/register', async (req, res) => {
  const clients = await db.Client.findAll({
    where: {
      email: req.body.email
    }
  })
//checks to see if client exists already with email
  if (clients.length) {
    res.status(422).json({ error: 'email already in use' })
  }

  if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
    return res.status(422).json({error: 'please include all required fields'})
  } 

  const hash = await bcrypt.hash(req.body.password, 10);

  const newclient = await db.Client.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash
  })

  res.json(newclient);
})

router.get('/home', (req, res) => {
  res.render('athlete_home', {
    locals: { title: "Athlete Home" },
    partials: {head: 'partials/head'}
  })
})

router.get('/login', (req, res) => {
  res.render('client-signin', {
    locals: { error: null }
  })
})

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.render('client-login', {
      locals: {
          error: 'Please submit all required field'
      }
  })
  return;
  }

  const client = await db.Client.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!client) {
    return res.status(404).render('error', {
      locals: { error: 'could not find client with that email'}
    })
  }

  //compare client input and password
  const match = await bcrypt.compare(req.body.password, coach.password)
  //throw error if wrong
  if (!match) {
    return res.status(401).render('error', {
      locals: { error: 'incorrect password'}
    })
  }
  //set client data on session
  req.body.client = client;

  res.json(client);
})

module.exports = router;


