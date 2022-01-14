const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
  isActive: {
    type: String,
    require: true,
  },
});
module.exports = Category = mongoose.model("Category", CategorySchema);
