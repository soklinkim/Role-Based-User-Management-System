require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbConnect");

const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", loginRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Login Service running on port ${process.env.PORT}`);
});