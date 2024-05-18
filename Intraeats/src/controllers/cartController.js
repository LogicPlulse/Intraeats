// controllers/cartController.js
const Cart = require('Intraeats\src\models\cart.js');
const Product = require('../models/Product');

exports.addItemToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate item price and total
    const itemPrice = product.price;
    const totalItemPrice = itemPrice * quantity;

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity and price
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price += totalItemPrice;
    } else {
      // Add new item to the cart
      cart.items.push({
        productId,
        quantity,
        price: totalItemPrice,
      });
    }

    // Save the cart
    cart.updatedAt = new Date();
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the item in the cart and remove it
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the cart
    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart', details: error.message });
  }
};
