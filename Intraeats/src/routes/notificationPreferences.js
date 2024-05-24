// routes/notificationPreferences.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const NotificationPreference = require('../models/NotificationPreference');
const auth = require('../middleware/auth');

const router = express.Router();

// Get notification preferences for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const preferences = await NotificationPreference.findOne({ user: req.user.id });
        if (!preferences) {
            return res.status(404).json({ msg: 'Notification preferences not found' });
        }
        res.json(preferences);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update notification preferences for the logged-in user
router.put('/', [auth, [
    check('orderConfirmation', 'Order confirmation preference is required').isBoolean(),
    check('orderCancellation', 'Order cancellation preference is required').isBoolean(),
    // Add other notification types as needed
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let preferences = await NotificationPreference.findOne({ user: req.user.id });
        if (!preferences) {
            preferences = new NotificationPreference({ user: req.user.id });
        }

        preferences.orderConfirmation = req.body.orderConfirmation;
        preferences.orderCancellation = req.body.orderCancellation;
        // Update other notification types as needed

        await preferences.save();
        res.json(preferences);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
