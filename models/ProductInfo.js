const mongoose = require("mongoose");
const ProductInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  unitName: {
    type: String,
    require: true,
  },
  unitID: {
    type: String,
    require: true,
  },
  presentPricePerUnit: {
    type: Number,
    require: true,
  }
});
module.exports = ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
