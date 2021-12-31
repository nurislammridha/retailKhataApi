const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  categoryId: {
    type: String,
    require: true,
  },
  categoryName: {
    type: String,
    require: true,
  },
  productMRP: {
    type: String,
    require: true,
  },
  isDiscount: {
    type: String,
    require: true,
  },
  discountPrice: {
    type: String,
    require: true,
  },
  productCode: {
    type: String,
    require: true,
  },
  productImage: {
    type: String,
    require: true,
  },
});
module.exports = Product = mongoose.model("Product", ProductSchema);
