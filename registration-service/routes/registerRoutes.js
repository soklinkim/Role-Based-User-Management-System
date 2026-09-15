const express = require("express");

const router = express.Router();

router.post("/userregister", (req, res) => {
    console.log("Registration API received a request");

    res.json({
        message: "Registration API is working",
        data: req.body
    });
});

module.exports = router;