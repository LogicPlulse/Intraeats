// controllers/userController.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Create a new user
    const user = new User({ email, password, role });
    await user.save();

    // Return the created user
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error (e.g., duplicate email)
      return res.status(400).json({ error: 'User with the provided email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
