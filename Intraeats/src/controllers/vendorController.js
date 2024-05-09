// controllers/vendorController.js
const Vendor = require('../models/Vendor');

exports.createVendor = async (req, res) => {
  try {
    // Validate input data
    const { name, address, phone, email } = req.body;
    if (!name || !address || !phone || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new vendor
    const vendor = new Vendor({ name, address, phone, email });
    await vendor.save();

    // Return the created vendor
    res.status(201).json(vendor);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error (e.g., duplicate email)
      return res.status(400).json({ error: 'Vendor with the provided email already exists' });
    }
    res.status(500).json({ error: 'Failed to create vendor' });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    // Find the vendor by ID and update their details
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    // If vendor is not found, return an error
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Return the updated vendor
    res.json(vendor);
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update vendor' });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    // Find the vendor by ID and delete them
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    // If vendor is not found, return an error
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Return a success message
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
};
