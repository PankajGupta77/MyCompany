
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
router.get('/regdoll', async (req, res) => {
  res.send(`<iframe style="width: -webkit-fill-available;height: -webkit-fill-available;"  src="https://games.crazygames.com/en_US/crazy-roll-3d/index.html" title="Crazy Roll 3D" scrolling="no" allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write; " allowfullscreen="" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups" loading="eager" data-hj-allow-iframe="true" class="css-ab5nf2">Crazy Roll 3D is an addicting avoid game. Check it out here in your browser. It is available as an unblocked game. It features details on keyboard and mouse controls to make it easier to play. That way, it is easy to see how to play Crazy Roll 3D. The game is made with WebGL to work in all modern browsers. If you like the game, you should also play our other avoid games or <a href='https://www.crazygames.com/game/jet-rush' target='_blank'>Jet Rush</a> and <a href='https://www.crazygames.com/game/helix-jump' target='_blank'>Helix Jump</a>.</iframe>`)
 
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
