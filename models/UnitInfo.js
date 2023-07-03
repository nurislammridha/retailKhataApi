const mongoose = require("mongoose");
const UnitInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  }
});
module.exports = UnitInfo = mongoose.model("UnitInfo", UnitInfoSchema);
