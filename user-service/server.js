require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbConnect");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`User Service running on port ${process.env.PORT}`);
});