const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js')

// NEW User Route
users.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

// create route and redirect back to welcome page
users.post('/', (req, res) => {
  // overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.redirect('/');
  });
});

module.exports = users
