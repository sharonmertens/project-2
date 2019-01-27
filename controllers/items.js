const express = require('express');
const router = express.Router();

// =======================================
//              DATABASE
// =======================================
const Item = require('../models/items.js');

// =======================================
//              ROUTES
// =======================================

// // localhost:3000
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// SEED Route
// ---------------------------------------
router.get('/seed', (req ,res) => {
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
router.put('/:id', (req, res) => {
  if (req.body.available === 'on') {
    req.body.available = true;
  } else {
    req.body.available = false;
  }
  Item.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/closetswap');
  });
});


// EDIT Route
// ---------------------------------------
router.get('/:id/edit', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render(
      './items/edit.ejs',
      {
        item: foundItem
      }
    );
  });
});

// DELETE Route
// ---------------------------------------
router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/closetswap');
  });
});

// INDEX Route
// ---------------------------------------
router.get('/', (req, res) => {
  // res.send('This is my Closet Swap Index Page');
  Item.find({}, (err, allItems) => {
    res.render(
      './items/index.ejs',
      {
        items:allItems
      }
    );
  });
});

// CREATE Route
// ---------------------------------------
router.post('/', (req, res) => {
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
router.get('/new', (req, res) => {
  res.render('./items/new.ejs');
});

// SHOW Route
// ---------------------------------------
router.get('/:id', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render(
      './items/show.ejs',
      {
        item:foundItem
      }
    );
  });
});

module.exports = router;
