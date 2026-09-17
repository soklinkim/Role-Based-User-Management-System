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

app.use("/admin", authenticateToken, authorizeRole("admin"));

app.use(
    createProxyMiddleware({
        target: process.env.ADMIN_SERVICE,
        changeOrigin: true,
        pathFilter: "/admin"
    })
);

// User Service
app.use("/user", authenticateToken, authorizeRole("user"));

app.use(
    createProxyMiddleware({
        target: process.env.USER_SERVICE,
        changeOrigin: true,
        pathFilter: "/user",
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader("x-user-id", req.user.id);
                }
            }
        }
    })
);

// Start Gateway

app.listen(process.env.PORT, () => {
    console.log(
        `API Gateway running at http://54.226.171.52:${process.env.PORT}`
    );
});