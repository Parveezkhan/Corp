const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/Corp');
    console.log("MongoDB Database Started...");
  } catch (error) {
    console.log(`MongoDB error:${error}`);
  }
};

module.exports = connectDB;
