const express = require("express");

const User = require("../models/User");

const router = express.Router();

// View Own Profile

router.get("/viewprofile", async (req, res) => {

    try {

        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "User identity not provided"
            });
        }

        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Update Own Profile
router.put("/updateprofile", async (req, res) => {

    try {

        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "User identity not provided"
            });
        }

        const {
            name,
            phone
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                phone
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;