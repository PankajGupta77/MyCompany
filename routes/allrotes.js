
const express = require('express');
const router = express.Router();

const { User, Product1, Order, OrderItem } = require('../model/model');

// Define routes using the models
router.post('/users', async (req, res) => {
  try {
    const { user_id, username, email, registration_date } = req.body;

    const newUser = new User({
      user_id,
      username,
      email,
      registration_date
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/products', async (req, res) => {
  try {
    const products = await Product1.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post('/products', async (req, res) => {
  console.log(req.body); // Add this line
  const { product_id, product_name, price, stock_quantity } = req.body;
  
  try {
    const product = new Product1({ product_id, product_name, price, stock_quantity });
    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/orderstable', async (req, res) => {
  try {
    const orders = await Order.find().populate('product', 'name'); // Populate product information
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post('/orderstable', async (req, res) => {
  const { order_id, user_id,order_date } = req.body;

  try {
    const order = new Order({ order_id, user_id,order_date });
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/OrderItemsTable', async (req, res) => {
  try {
    const orderItems = await OrderItem.find() // Populate order and product information
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order item
router.post('/OrderItemsTable', async (req, res) => {
  const { order_item_id, order_id, product_id,quantity } = req.body;

  try {
    const orderItem = new OrderItem({ order_item_id, order_id, product_id,quantity  });
    await orderItem.save();
    res.status(201).json({ message: 'Order item created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
