const express = require('express');
const sessions = express.Router();

// log in form
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

module.exports = sessions
