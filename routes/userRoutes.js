const express = require("express");
const userRoute = express.Router();

const {
    getUser,
    createUser,
    initializeTrans,
    verifyTrans,
} = require("../controllers/userController");

userRoute.get("/getUser/:id", getUser);
userRoute.post("/createUser", createUser);
userRoute.post("/initiatetransaction/:id", initializeTrans);
userRoute.post("/verifytransaction/:id", verifyTrans);

module.exports = {
    userRoute,
};
