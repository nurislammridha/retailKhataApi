const mongoose = require("mongoose");
const DailySellSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  timeStamp: {
    type: Number,
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
  buyerPhone: {
    type: String,
    require: true,
  },
  buyerAddress: {
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
  profit: {
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
module.exports = DailySell = mongoose.model("DailySell", DailySellSchema);
