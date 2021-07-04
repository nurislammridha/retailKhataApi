const mongoose = require("mongoose");
const NewsSchema = new mongoose.Schema({
  newsTitle: {
    type: String,
    require: true,
  },
  shortDescription: {
    type: String,
    require: true,
  },
  fullDescription: {
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
  createdAt: {
    type: String,
    require: true,
  },
  writterId: {
    type: String,
    require: true,
  },
  writterName: {
    type: String,
    require: true,
  },
  reletedNews: [
    {
      value: { type: String, require: true },
      label: { type: String, require: true },
    },
  ],
  isPublish: {
    type: Boolean,
    require: true,
  },
});
module.exports = News = mongoose.model("News", NewsSchema);
