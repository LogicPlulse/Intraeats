// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

// Use JWT authentication
const jwtAuth = passport.authenticate('jwt', { session: false });

// User routes
router.post('/', jwtAuth, userController.createUser);
router.put('/:id', jwtAuth, userController.updateUser);
router.delete('/:id', jwtAuth, userController.deleteUser);

module.exports = router;
