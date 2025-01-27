const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully 1");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// Collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;