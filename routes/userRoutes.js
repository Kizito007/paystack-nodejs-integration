const express = require("express");
const userRoute = express.Router();

const {
    getUser,
    createUser,
} = require("../controllers/userController");

userRoute.get("/getUser/:id", getUser);
userRoute.post("/createUser", createUser);

module.exports = {
    userRoute,
};
