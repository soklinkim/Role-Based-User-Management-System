const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Search Users
router.get("/searchuser", async (req, res) => {

    try {

        const { name, email } = req.query;

        if (!name && !email) {
            return res.status(400).json({
                message: "Please provide name or email"
            });
        }

        let query = {};

        if (email) {
            query.email = email.toLowerCase();
        } else if (name) {
            query.name = {
                $regex: name,
                $options: "i"
            };
        }

        const users = await User.find(query)
            .select("-password");

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// View all users
router.get("/viewalluser", async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.json({
            count: users.length,
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Delete user
router.delete("/deluser", async (req, res) => {

    try {

        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const deletedUser = await User.findOneAndDelete({
            email: email.toLowerCase()
        });

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;