const mongoose = require("mongoose");
const BuyerInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  }
});
module.exports = BuyerInfo = mongoose.model("BuyerInfo", BuyerInfoSchema);
