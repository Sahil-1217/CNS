const mongoose = require('mongoose');
const connectDB = async()=> {
  try {
    mongoose.set('strictQuery', false);
    //const conn = await mongoose.connect(process.env.MONGODB_URI);
    const conn = await mongoose.connect("mongodb://localhost:27017/test");
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}


mongodb: module.exports = connectDB;

