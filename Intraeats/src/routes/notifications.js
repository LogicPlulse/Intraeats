// routes/notifications.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

// Send notification
router.post('/', [auth, [
    check('message', 'Message is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const notification = new Notification({
            user: req.user.id,
            message: req.body.message,
            type: req.body.type
        });

        await notification.save();
        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all notifications for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Mark notification as read
router.put('/:id', auth, async (req, res) => {
    try {
        let notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }

        // Ensure user owns notification
        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        notification.read = true;
        await notification.save();
        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
