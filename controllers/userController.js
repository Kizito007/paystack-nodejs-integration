const User = require("../models/userModel");

const createUser = async (req, res) => {
    let { email, fullname } = req.body;

    const user = new User({
        fullname,
        email,
    });
    await user.save();

    res.status(201).send({
        data: user,
        message: "User created successfully",
        status: 0,
    });
}

const getUser = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findById(id);

        res.status(200).send({
            user,
            message: "Found user Details",
            status: 0,
        });
    } catch (err) {
        res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
};

module.exports = {
    createUser,
    getUser,
};
