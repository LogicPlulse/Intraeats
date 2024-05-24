// models/NotificationPreference.js
const mongoose = require('mongoose');

const notificationPreferenceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderConfirmation: { type: Boolean, default: true },
    orderCancellation: { type: Boolean, default: true },
    // Add other notification types as needed
});

module.exports = mongoose.model('NotificationPreference', notificationPreferenceSchema);
