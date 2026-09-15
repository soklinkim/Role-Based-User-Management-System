app.use(
    "/user",
    authenticateToken,
    authorizeRole("user"),
    createProxyMiddleware({
        target: process.env.USER_SERVICE,
        changeOrigin: true,

        on: {
            proxyReq: (proxyReq, req) => {

                proxyReq.setHeader(
                    "x-user-id",
                    req.user.id
                );
            }
        }
    })
);