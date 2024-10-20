const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env

const connectDB = async () => {
    try {
        // Connect to MongoDB using the environment variable
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

