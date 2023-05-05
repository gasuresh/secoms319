const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  creditCard: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
});

const orderSchema = new mongoose.Schema({
  products: [productSchema],
  user: userSchema,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;