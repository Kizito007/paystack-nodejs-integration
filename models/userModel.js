const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: mongoose.Schema.Types.Mixed,
    },
    paystack_ref: {
        type: String,
    },
    amountDonated: {
        type: Number,
    },
    isSubscribed: {
        type: Boolean,
    },
    timeSubscribed: {
        type: Date,
    },
    subscriptionEndDate: {
        type: Date,
    },
    subscriptionDuration: { type: Number },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
