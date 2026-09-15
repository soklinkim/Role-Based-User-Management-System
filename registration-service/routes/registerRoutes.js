const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

router.post("/userregister", async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            phone
        } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "Name, email, password and phone are required"
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            phone
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;