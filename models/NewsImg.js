const mongoose = require("mongoose");
const NewsImgSchema = new mongoose.Schema({
  newsId: {
    type: mongoose.Types.ObjectId,
    ref: "News",
  },
  featureImg: {
    type: String,
    require: true,
  },
  thumbnailImg: {
    type: String,
    require: true,
  },
});
module.exports = NewsImg = mongoose.model("NewsImg", NewsImgSchema);
