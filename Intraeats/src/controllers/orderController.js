// controllers/orderController.js
const Order = require('Intraeats\src\models\order.js');
const PaymentService = require('../services/paymentService');
const { validationResult } = require('express-validator');

exports.processOrder = async (req, res) => {
  // Validate input data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid input', details: errors.array() });
  }

  try {
    const { userId, items, paymentInfo } = req.body;

    // Create a new order
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = new Order({ user: userId, items, totalAmount });
    await order.save();

    // Process payment
    const paymentResult = await PaymentService.processPayment(order, paymentInfo);
    if (!paymentResult.success) {
      // If payment failed, update order status and return error
      order.status = 'Failed';
      await order.save();
      return res.status(402).json({ error: 'Payment failed', details: paymentResult.error });
    }

    // Update order status
    order.status = 'Completed';
    await order.save();

    // Return successful order response
    res.status(201).json(order);
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order', details: error.message });
  }
};
