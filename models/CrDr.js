const mongoose = require("mongoose");
const CrDrSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  timeStamp: {
    type: Number,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  details: {
    type: String,
    require: true,
  },
  purpose: {
    type: String,
    require: true,
  },
  purposeID: {
    type: String,
    require: true,
  },
  isCredit: {
    type: Boolean,
    require: true,
  }
});
module.exports = CrDr = mongoose.model("CrDr", CrDrSchema);
