const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await User.findById(id);
        res.json({
            status: 200,
            msg: "ok",
            data: users,
        });
    } catch (error) {
        return "error at get user ", error;
    }
};

const getAllUsers = async (req, res) => {
    try {
        console.log("error");
        const users = await User.find();
        res.json({
            status: 200,
            msg: "ok",
            data: users,
        });
    } catch (error) {
        return "error at get all users ", error;
    }
};
module.exports = { getUser, getAllUsers };