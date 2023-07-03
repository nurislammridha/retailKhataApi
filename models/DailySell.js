const mongoose = require("mongoose");
const DailySellSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  buyerName: {
    type: String,
    require: true,
  },
  buyerID: {
    type: String,
    require: true,
  },
  productName: {
    type: String,
    require: true,
  },
  productID: {
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
  quantity: {
    type: String,
    require: true,
  },
  totalPrice: {
    type: String,
    require: true,
  },
  cash: {
    type: String,
    require: true,
  },
  due: {
    type: String,
    require: true,
  },
  details: {
    type: String,
    require: true,
  },
  isPaid: {
    type: Boolean,
    require: true,
  },
  paymentHistory: [
    {
      paymentDate: { type: String, require: true },
      amount: { type: String, require: true }
    }
  ]
});
module.exports = DailySell = mongoose.model("DailySell", DailySellSchema);
