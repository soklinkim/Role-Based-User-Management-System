require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbConnect");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Admin Service running on port ${process.env.PORT}`);
});