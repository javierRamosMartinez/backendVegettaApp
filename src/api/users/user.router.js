const express = require('express');

const userRouter = express.Router();
const {
    getUser,
    getAllUsers,
} = require('./user.controller');

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);

module.exports = userRouter;
