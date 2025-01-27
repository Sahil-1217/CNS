const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  site_id: {
    type: Number,
    required: true,
   
  },
  
  
  name: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  payable: {
    type: Number, // Assuming the payable amount is a numeric value
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  time_in: {
    type: Date,
    required: true
  },
  time_out: {
    type: Date,
    required: true
  },
  hours_worked: {
    type: Number, // Assuming hours worked is a numeric value
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
