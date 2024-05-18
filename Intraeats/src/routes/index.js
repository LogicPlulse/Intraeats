// routes/index.js
const express = require('express');
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const vendorRoutes = require('./vendorRoutes');

const router = express.Router();

// Attach routes from different files
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/vendors', vendorRoutes);

module.exports = router;
