const mongoose = require("mongoose");

const uri = "mongodb+srv://soklinkim555_db_user:1234@cluster0.ptrqysm.mongodb.net/role_based?appName=Cluster0";

const clientOptions = {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true
    }
};

async function connectDB() {
    try {
        await mongoose.connect(uri, clientOptions);

        await mongoose.connection.db.admin().command({
            ping: 1
        });

        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

module.exports = connectDB;
