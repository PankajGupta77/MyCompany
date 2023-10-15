const mongoose = require('mongoose');


// Define the schema for Users table
const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  registration_date: { type: Date, default: Date.now }
});

// Define the schema for Products table

const productSchema1 = new mongoose.Schema({
  product_id: { type: Number, required: true },
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true }
});

// Define the schema for Orders table
const orderSchema = new mongoose.Schema({
  order_id: Number,
  user_id: Number,
  order_date: Date,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product1'
  }
});

// Define the schema for OrderItems table
const orderItemSchema = new mongoose.Schema({
  order_item_id: { type: Number, required: true },
  order_id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }
});

// Create models for each schema
const User = mongoose.model('User', userSchema);
// const Product = mongoose.model('product', productSchema);
const Product1 = mongoose.model('products', productSchema1);
const Order = mongoose.model('orders', orderSchema);
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = {
  User,
  Product1,
  Order,
  OrderItem
};
