const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String},
  brand: { type: String},
  price: { type: Number },
  size: { type: Number },
  available: Boolean
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
