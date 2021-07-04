const mongoose = require("mongoose");
const WritterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  division: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
});
module.exports = Writter = mongoose.model("Writter", WritterSchema);
