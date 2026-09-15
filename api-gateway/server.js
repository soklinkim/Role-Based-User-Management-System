require("dotenv").config();

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const {
    authenticateToken,
    authorizeRole
} = require("./middleware/authMiddleware");

const app = express();
// Gateway Test

app.get("/", (req, res) => {
    res.json({
        message: "API Gateway is working"
    });
});

// Registration Service

app.use(
    createProxyMiddleware({
        target: process.env.REGISTRATION_SERVICE,
        changeOrigin: true,
        pathFilter: "/register"
    })
);

// Login Service

app.use(
    createProxyMiddleware({
        target: process.env.LOGIN_SERVICE,
        changeOrigin: true,
        pathFilter: "/auth"
    })
);

// Admin Service

app.use(
    "/admin",
    authenticateToken,
    authorizeRole("admin"),
    createProxyMiddleware({
        target: process.env.ADMIN_SERVICE,
        changeOrigin: true
    })
);

// User Service
app.use(
    "/user",
    authenticateToken,
    authorizeRole("user"),
    createProxyMiddleware({
        target: process.env.USER_SERVICE,
        changeOrigin: true
    })
);

// Start Gateway

app.listen(process.env.PORT, () => {
    console.log(
        `API Gateway running at http://localhost:${process.env.PORT}`
    );
});