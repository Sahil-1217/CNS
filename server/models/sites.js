const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SitesSchema = new Schema({
  SiteNumber: {
    type: Number,
    required: true,
   
  },

  SiteName: {
    type: String,
    required: true,
  },
  SiteLocation: {
    type: String,
    required: true,
  },
  // TruckNo: {
  //   type: String,
  //   required: true,
  // },
  // Material: {
  //   type: String,
  //   required: true,
  // },
  details: {
    type: String,
    required: true,
  },
  SiteManger: {
    type: String,
    requried: true,
  },
  //materials: [{ type: Schema.Types.ObjectId, ref: "Material" }], // One-to-many relationship with Material model

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Sites_info", SitesSchema);
