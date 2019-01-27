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

// =======================================
//              DATABASE
// =======================================
const Item = require('./models/items.js');
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
// =======================================
//              ROUTES
// =======================================

// // localhost:3000
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// SEED Route
// ---------------------------------------
app.get('/seed', (req ,res) => {
  Item.create([
    {
      type: 'Skirt',
      description: 'Jean Miniskirt',
      img: 'https://images-na.ssl-images-amazon.com/images/G/01/Shopbop/p/prod/products/seven/seven4102212743/seven4102212743_q4_2-0._UY0_QL90_.jpg',
      brand: '7 For All Mankind',
      price: 129,
      size: 6,
      available: true
    },
    {
      type: 'Sweatshirt',
      description: 'Comfy roadtrip sweatshirt',
      img: 'https://images-na.ssl-images-amazon.com/images/G/01/Shopbop/p/prod/products/wildf/wildf4235712165/wildf4235712165_q2_2-0._UY0_QL90_.jpg',
      brand: 'Wildfox',
      price: 108,
      size: 0,
      available: true
    },
    {
      type: 'Pajamas',
      description: 'Solid Ivory PJ Set',
      img: 'https://www.shopbop.com/solid-ivory-set-bedhead/vp/v=1/1526786870.htm?folderID=13243&fm=other-shopbysize-viewall&os=false&colorId=13149',
      brand: 'Bedhead+',
      price: 114,
      size: 4,
      available: true
    }
  ]);
});

// UPDATE Route
// ---------------------------------------


// EDIT Route
// ---------------------------------------
app.get('/closetswap/:id/edit', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render(
      'edit.ejs',
      {
        item: foundItem
      }
    );
  });
});

// DELETE Route
// ---------------------------------------
app.delete('/closetswap/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/closetswap');
  });
});

// INDEX Route
// ---------------------------------------
app.get('/closetswap', (req, res) => {
  // res.send('This is my Closet Swap Index Page');
  Item.find({}, (err, allItems) => {
    res.render(
      'index.ejs',
      {
        items:allItems
      }
    );
  });
});

// CREATE Route
// ---------------------------------------
app.post('/closetswap', (req, res) => {
  if (req.body.available === 'on' ) {
    req.body.available = true;
  } else {
    req.body.available = false;
  }
  Item.create(req.body, (err, createdItem) => {
    res.redirect('/closetswap');
  });
});

// NEW Route
// ---------------------------------------
app.get('/closetswap/new', (req, res) => {
  res.render('new.ejs');
});

// SHOW Route
// ---------------------------------------
app.get('/closetswap/:id', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render(
      'show.ejs',
      {
        item:foundItem
      }
    );
  });
});

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
