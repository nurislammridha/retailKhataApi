const express = require("express");
const router = express.Router();
const NewsImg = require("../../models/NewsImg");
var multer = require("multer");
const path = require("path");
const folder = "./up/";
const fs = require("fs");
//define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

router.post(
  "/:id",
  upload.fields([
    { name: "feature_img", maxCount: 1 },
    { name: "thumbnail_img", maxCount: 1 },
  ]),
  async (req, res) => {
    const { feature_img, thumbnail_img } = req.files;
    const [feature] = feature_img;
    const [thumbnail] = thumbnail_img;
    var info = {
      newsId: req.params.id,
      featureImg: feature.path,
      thumbnailImg: thumbnail.path,
    };

    try {
      info = new NewsImg(info);
      await info.save();
      res.json("Inserted Successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
// all Category
router.get("/", async (req, res) => {
  try {
    await NewsImg.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Get successfully!",
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// //Update Image
// //Update Feature Images
router.put("/feature/:id", upload.single("feature_img"), async (req, res) => {
  const feature_img = req.file;
  var info = {
    featureImg: feature_img.path,
  };
  //delete before thumbnail imag
  await NewsImg.find({ newsId: req.params.id }, (err, data) => {
    const [info] = data;
    fs.unlinkSync(info.featureImg);
  });

  //Now updated
  await NewsImg.updateOne(
    { newsId: req.params.id },
    {
      $set: info,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Feature were updated successfully!",
        });
      }
    }
  );
});
// //Update Thumbnail Images
router.put(
  "/thumbnail/:id",
  upload.single("thumbnail_img"),
  async (req, res) => {
    const thumbnail_img = req.file;
    var info = {
      thumbnailImg: thumbnail_img.path,
    };
    //delete before thumbnail imag
    await NewsImg.find({ newsId: req.params.id }, (err, data) => {
      const [info] = data;
      fs.unlinkSync(info.thumbnailImg);
    });

    //Now updated
    await NewsImg.updateOne(
      { newsId: req.params.id },
      {
        $set: info,
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            message: "Thumbnail were updated successfully!",
          });
        }
      }
    );
  }
);
// router.put("/feature/:id", async (req, res) => {
//   await Category.updateOne(
//     { _id: req.params.id },
//     {
//       $set: req.body,
//     },
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           error: "There was a server side error!",
//         });
//       } else {
//         res.status(200).json({
//           message: "Category were updated successfully!",
//         });
//       }
//     }
//   );
// });

//delete category
router.delete("/:id", async (req, res) => {
  await NewsImg.find({ newsId: req.params.id }, (err, data) => {
    const [info] = data;
    fs.unlinkSync(info.featureImg);
    fs.unlinkSync(info.thumbnailImg);
  });
  await NewsImg.deleteOne({ newsId: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "News Img was deleted successfully!",
      });
    }
  });
});
module.exports = router;
