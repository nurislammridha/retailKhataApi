const mongoose = require("mongoose");
const DailyBuySchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  timeStamp: {
    type: String,
    require: true,
  },
  dealerName: {
    type: String,
    require: true,
  },
  dealerID: {
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
    type: Number,
    require: true,
  },
  pricePerUnit: {
    type: Number,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  cash: {
    type: Number,
    require: true,
  },
  due: {
    type: Number,
    require: true,
  },
  details: {
    type: String,
    require: true,
  },
  otherCost: {
    type: Number,
    require: true,
  },
  isPaid: {
    type: Boolean,
    require: true,
  },
  paymentHistory: [
    {
      paymentDate: { type: String, require: true },
      amount: { type: Number, require: true },
    },
  ],
});
module.exports = DailyBuy = mongoose.model("DailyBuy", DailyBuySchema);
