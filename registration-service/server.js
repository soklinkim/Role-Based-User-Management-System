require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbConnect");

const registerRoutes = require("./routes/registerRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/register", registerRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Registration Service running on port ${process.env.PORT}`);
});