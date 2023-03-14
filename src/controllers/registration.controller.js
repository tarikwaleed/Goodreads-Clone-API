const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const payload = {
            user_id: user._id,
            email: user.email,
            role: user.role
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                payload,
                process.env.TOKEN_KEY,
            );
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

}
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const payload = {
            user_id: user._id,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
        );
        user.token = token;
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}
exports.create_admin = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: "admin"
        });
        const payload = {
            user_id: user._id,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
        );
        user.token = token;
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}