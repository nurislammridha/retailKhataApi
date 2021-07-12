const express = require("express");
const router = express.Router();
const News = require("../../models/News");
const NewsImg = require("../../models/NewsImg");
//@route POST api/news
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {
    news = new News(req.body);
    await news.save((err, res1) => {
      res.send(res1);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all News
router.get("/", async (req, res) => {
  try {
    await NewsImg.find({})
      .populate("newsId")
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            result: data,
            message: "All News!",
          });
        }
      });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// News By ID.
router.get("/:id", async (req, res) => {
  await NewsImg.find({ _id: req.params.id })
    .populate("newsId")
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        let [obj] = data;
        res.status(200).json({
          result: obj,
          message: "News by Id get successfully!",
        });
      }
    });
});

//Update News
router.put("/:id", async (req, res) => {
  await News.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "News were updated successfully!",
        });
      }
    }
  );
});

//delete news
router.delete("/:id", async (req, res) => {
  await News.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "News was deleted successfully!",
      });
    }
  });
});
module.exports = router;
