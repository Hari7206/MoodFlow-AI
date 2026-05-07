const mongoose = require("mongoose");

function connectToDb() {
    return mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected");
        })
        .catch((err) => {
            console.log("DB connection failed:", err.message);
        });
}

module.exports = connectToDb;