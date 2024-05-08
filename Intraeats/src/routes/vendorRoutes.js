// routes/vendorRoutes.js
const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const passport = require('passport');

// Use JWT authentication
const jwtAuth = passport.authenticate('jwt', { session: false });

// Vendor routes
router.post('/', jwtAuth, vendorController.createVendor);
router.put('/:id', jwtAuth, vendorController.updateVendor);
router.delete('/:id', jwtAuth, vendorController.deleteVendor);

module.exports = router;
