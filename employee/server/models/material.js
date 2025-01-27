const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const materialSchema = new Schema({
  //cost ,dealler name, quantity,
  SiteNumber1: {
    type: Number,
    required: true,
    //unique: true,
  },
  TruckNo1: {
    type: String,
    required: true,
  },
  Material: {
    type: String,
    required: true,
  },
  Cost: {
    type: String,
    requried: true,
  },
  DealerName: {
    type: String,
    requried: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  SiteManger1: {
    type: String,
    requried: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Material", materialSchema);
