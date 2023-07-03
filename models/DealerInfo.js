const mongoose = require("mongoose");
const DealerInfoSchema = new mongoose.Schema({
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
module.exports = DealerInfo = mongoose.model("DealerInfo", DealerInfoSchema);
