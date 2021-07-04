const mongoose = require("mongoose");
const TestSchema = new mongoose.Schema({
  testId: {
    type: String,
    require: true,
  },
  avatarImg: {
    type: String,
    require: true,
  },
  galImg: {
    type: String,
    require: true,
  },
});
module.exports = Test = mongoose.model("Test", TestSchema);
