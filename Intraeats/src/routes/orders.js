// routes/orders.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Notification = require('../models/Notification');
const NotificationPreference = require('../models/NotificationPreference');
const auth = require('../middleware/auth');

const router = express.Router();

// Function to send notifications based on user preferences
const sendNotification = async (userId, message, type) => {
    const preferences = await NotificationPreference.findOne({ user: userId });
    if (!preferences || preferences[type]) {
        const notification = new Notification({
            user: userId,
            message,
            type
        });
        await notification.save();
    }
};

// Process a new order
router.post('/', [auth, [
    check('items', 'Items are required').isArray({ min: 1 }),
    check('total', 'Total amount is required').isNumeric()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const order = new Order({
            user: req.user.id,
            items: req.body.items,
            total: req.body.total,
            status: 'confirmed'
        });

        await order.save();

        // Send order confirmation notification
        await sendNotification(req.user.id, `Your order #${order._id} has been confirmed.`, 'orderConfirmation');

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Cancel an order
router.delete('/:id', auth, async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Ensure user owns the order
        if (order.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        order.status = 'canceled';
        await order.save();

        // Send order cancellation notification
        await sendNotification(req.user.id, `Your order #${order._id} has been canceled.`, 'orderCancellation');

        res.json({ msg: 'Order canceled' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
