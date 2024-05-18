// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const jwtAuth = require('../middleware/jwtAuth');

// Add an item to the cart
router.post('/add', jwtAuth, cartController.addItemToCart);

// Remove an item from the cart
router.delete('/remove/:itemId', jwtAuth, cartController.removeItemFromCart);

module.exports = router;
