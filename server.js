// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const db = mongoose.connection;

// =======================================
//             CONFIGURATION
// =======================================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI

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
