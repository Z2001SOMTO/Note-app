const mongoose = require('mongoose');
require("dotenv").config()

const connectToDB = async (cb) => {
  try {
  mongoose.set('strictQuery', false)  
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("Connected to MongoDB")
  cb()
}
catch(e) {
    console.log("Failed to connect to MongoDB")
 }
}
module.exports = connectToDB