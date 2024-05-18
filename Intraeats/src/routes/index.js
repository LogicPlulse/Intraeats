// routes/index.js
const express = require('express');
const router = express.Router();
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const vendorRoutes = require('./vendorRoutes');
const cartRoutes = require('./Intraeats\src\routes\cartroutes.js');

// Attach routes from different files
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/vendors', vendorRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
