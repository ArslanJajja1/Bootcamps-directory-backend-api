const mongoose = require("mongoose");

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`Mongodb connected successfully`);
};

module.exports = connectDB;
