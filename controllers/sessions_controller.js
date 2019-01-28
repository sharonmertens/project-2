const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

// log in form
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

// create a new session for our user through a POST request
sessions.post('/', (req, res) => {
  User.findOne( {username: req.body.username}, (err, foundUser) => {
    // from input in browser === found from database
    if ( bcrypt.compareSync(req.body.password, foundUser.password)) {
      if (err) console.log(err);
      req.session.currentUser = foundUser
      res.redirect('/closetswap');
    } else {
      res.send("<a href='/'>Wrong Password</a>");
    }
  });
});

// end the session and redirect back to sign in page
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  });
});

module.exports = sessions
