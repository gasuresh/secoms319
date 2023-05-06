const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  quantity: Number,
});

const formSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  creditCard: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
});

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },

    admin: {
        type: Boolean,
        default: false
    }

});

const orderSchema = new mongoose.Schema({
  cart: [productSchema],
  formData: formSchema,
  currUser: UserSchema,
},
    { collection: "orders" }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;