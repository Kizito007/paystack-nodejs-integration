const express = require("express");
const planRoute = express.Router();

const {
    createPlan,
    getPlans,
    addWebhook,
} = require("../controllers/planController");

planRoute.get("/getPlans", getPlans);
planRoute.post("/createPlan", createPlan);
planRoute.post("/paystackWebhook", addWebhook);

module.exports = {
    planRoute,
};
