const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../users/user.model");

const register = async (req, res) => {
    try {
        const user = new User(req.body);
        const userExist = await User.findOne({ mail: req.body.mail });
        if (userExist) {
            return console.error("error: user already exist");
        }

        user.password = bcrypt.hashSync(user.password, 10);
        const newUser = await user.save();
        console.log('newuser: ', newUser);
        return res.json({
            status: 200,
            message: `User ${newUser.mail} created`,
        })

    } catch (error) {
        console.error("error at register user", error);
        return "error at register user", error;
    }
}

const login = async (req, res) => {
    try {
        const userInfo = await User.findOne({ mail: req.body.mail });
        console.log(bcrypt.compareSync(req.body.password, userInfo.password));
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            userInfo.password = "*************";

            console.log('user', userInfo)
            const token = jwt.sign({
                id: userInfo._id,
                mail: userInfo.mail,
            },
                process.env.JWT_SECRET,
                { expiresIn: "30" }
            );

            return res.status(200).json({
                data: { message: "ok", user: userInfo, token }
            })
        } else {
            return res.json({
                status: 400,
                message: "invalid credentials",
                data: null,
            })
        }
    } catch (error) {
        return "error at login user", error;
    }
};

module.exports = { register, login };