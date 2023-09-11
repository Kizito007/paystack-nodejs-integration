const User = require("../models/userModel");

// Require the library
const paystack = require("paystack-api")(process.env.TEST_SECRET);

// Paystack webhook helpers: Functions that should be called on paystack event updates
// invoicePaymentFailed, invoiceCreation, invoiceUpdate, subscriptionNotRenewed, subscriptionDisabled, chargeSuccess

const chargeSuccess = async (data) => {
    try {
        const output = data.data;
        const reference = output.reference;
        // console.log(output);

        const user = await User.findOne({ paystack_ref: reference });
        const userId = user._id;
        console.log("Updating charge status");

        if (user.paystack_ref == "success")
            return ({
                data: {},
                message: "Transaction has been verified",
                status: 1,
            });

        const response = await paystack.transaction.verify({
            reference: user.paystack_ref
        })

        if (response.data.status == "success") {
            const data = {
                paystack_ref: response.data.status,
                amountDonated: output.amount,
            }
            await User.findByIdAndUpdate(userId, data);

            console.log("Charge Successful");
        } else {
            console.log("Charge Unsuccessful");
        }

    } catch (error) {
        console.log({ data: {}, error: `${error.message}`, status: 1 });
    }
};

// succesful subscription
const planChargeSuccess = async (data) => {
    try {
        const output = data.data;
        const reference = output.reference;
        // console.log(output);

        const user = await User.findOne({ paystack_ref: reference });
        const userId = user._id;
        // console.log(user, reference);

        console.log("Updating charge status");

        // subscribe for user
        if (user.paystack_ref == "success")
            return ({
                data: {},
                message: "Transaction has been verified",
                status: 1,
            });

        const response = await paystack.transaction.verify({
            reference: user.paystack_ref
        })

        if (response.data.status == "success") {
            await User.findByIdAndUpdate(userId, {
                isSubscribed: true,
                paystack_ref: response.data.status,
                planName: output.plan.name,
                timeSubscribed: response.data.paid_at,
            });
            console.log("Charge Successful");
        } else {
            console.log("Charge Unsuccessful");
        }

    } catch (error) {
        console.log({ data: {}, error: `${error.message}`, status: 1 });
    }
};

// invoicePaymentFailed
const cancelSubscription = async (data) => {
    try {
        const output = data.data;
        const reference = output.reference;
        // console.log(output);

        const user = await User.findOne({ paystack_ref: reference });
        const userId = user._id;

        console.log("Cancelling subscription...");

        await User.findByIdAndUpdate(userId, {
            isSubscribed: true,
            paystack_ref: response.data.status,
            planName: "cancelled",
        });
        console.log("User Subscription Cancelled");

    } catch (error) {
        console.log({ data: {}, error: `${error.message}`, status: 1 });
    }
};

module.exports = {
    planChargeSuccess,
    chargeSuccess,
    cancelSubscription,
};