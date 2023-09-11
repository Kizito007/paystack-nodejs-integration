// Require the library
const paystack = require("paystack-api")(process.env.TEST_SECRET);
const User = require("../models/userModel");
const { planChargeSuccess, chargeSuccess, cancelSubscription, } = require("../helpers/webhookHelpers");

const createPlan = async (req, res) => {
    try {
        const { interval, name, amount } = req.body;

        const response = await paystack.plan.create({
            name,
            amount,
            interval,
        });

        res.status(200).send({
            data: response.data,
            message: response.message,
            status: response.status,
        });

    } catch (error) {
        res.status(400).send({ data: {}, error: `${error.message}`, status: 1 });
    }
};

const getPlans = async (req, res) => {
    try {
        const response = await paystack.plan.list();

        res.status(200).send({
            data: response.data,
            message: response.message,
            status: response.status,
        });

    } catch (error) {
        res.status(400).send({ data: {}, error: `${error.message}`, status: 1 });
    }
};

// our webhook function for event listening
// you can edit this to your style
const addWebhook = async (req, res) => {
    try {
        let data = req.body;
        console.log('Webhook data: ', data);

        switch (data) {
            case data.event = "invoice.payment_failed":
                await cancelSubscription(data);
                console.log("Invoice Failed");
                break;
            case data.event = "invoice.create":
                console.log("invoice created");
                break;
            case data.event = "invoice.update":
                data.data.status == "success" ?
                    await planChargeSuccess(data) :
                    console.log("Update Failed");
                break;
            case data.event = "subscription.not_renew":
                console.log("unrenewed");
                break;
            case data.event = "subscription.disable":
                console.log("disabled");
                break;
            case data.event = "transfer.success":
                console.log("transfer successful");
                break;
            case data.event = "transfer.failed":
                console.log("transfer failed");
                break;
            case data.event = "transfer.reversed":
                console.log("transfer reversed");
                break;
            case data.event = "subscription.disable":
                console.log("disabled");
                break;

            default:
                // successful charge
                const obj = data.data.plan;
                console.log("Implementing charges logic...");
                // object comparison verifying if its a normal payment or a plan
                // charges for subscription and card
                Object.keys(obj).length === 0 && obj.constructor === Object ?
                    await chargeSuccess(data) :
                    // charge sub
                    await planChargeSuccess(data);
                console.log("Successful");
                break;
        }

    } catch (error) {
        res.status(400).send({ data: {}, error: `${error.message}`, status: 1 });
    }
};

module.exports = {
    createPlan,
    getPlans,
    addWebhook,
};