const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  nickName: {
    type: String,
    require: true,
  },
  profession: {
    type: String,
    require: true,
  },
  village: {
    type: String,
    require: true,
  },
  villageArea: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  foundDescription: {
    type: String,
    require: true,
  },
});
module.exports = User = mongoose.model("User", UserSchema);
