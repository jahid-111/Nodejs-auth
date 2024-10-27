const mongoose = require("mongoose");

async function dbConnect(dbUrl) {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { dbConnect };
