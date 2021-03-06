// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const db = mongoose.connection;
const session = require('express-session');

// =======================================
//             CONFIGURATION
// =======================================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'project-2'

// use controller file in server.js
const itemsController = require('./controllers/items');


// =======================================
//              MIDDLEWARE
// =======================================
// use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// use method methodOverride
app.use(methodOverride('_method'));

// use controller file in server.js
app.use('/closetswap', itemsController);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// =======================================
//              AUTHORIZATION ROUTES
// =======================================
// INDEX route
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  });
});

// =======================================
//          USER - 7 restful routes
// =======================================
const userController = require('./controllers/users_controller.js');
app.use('/users', userController);

// =======================================
//          SESSIONS routes
// =======================================
const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
  console.log(`Project 2 App listening on port: ${PORT}`);
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// connect express to mongo
mongoose.connect(mongoURI, { useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
