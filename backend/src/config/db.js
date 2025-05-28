require('dotenv').config();
const mongoose = require('mongoose');
const createDefaultAdmin = require('../utils/createDefaultAdmin');


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        createDefaultAdmin();
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
};

module.exports = connectDb;