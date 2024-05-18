// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { body } = require('express-validator');
const jwtAuth = require('../middleware/jwtAuth');

// Define routes for order-related functionality
router.post(
  '/',
  jwtAuth,
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  orderController.processOrder
);

module.exports = router;
