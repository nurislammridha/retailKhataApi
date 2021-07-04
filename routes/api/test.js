const express = require("express");
const router = express.Router();
const Test = require("../../models/Test");
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
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 1 },
  ]),
  async (req, res) => {
    const { avatar, gallery } = req.files;
    const [ava] = avatar;
    const [gal] = gallery;
    var info = {
      testId: req.params.id,
      avatarImg: ava.path,
      galImg: gal.path,
    };

    try {
      info = new Test(info);
      await info.save((req, res) => {
        console.log(`res`, res);
      });
      res.json("Insertedt");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
// all Category
router.get("/", async (req, res) => {
  try {
    await Test.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Todo was inserted successfully!",
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// //Update Category
// router.put("/:id", async (req, res) => {
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
  await Test.find({ _id: req.params.id }, (err, data) => {
    const [info] = data;
    console.log(`data`, data);
    fs.unlinkSync(info.avatarImg);
    fs.unlinkSync(info.galImg);
  });
  await Test.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Category was deleted successfully!",
      });
    }
  });
});
module.exports = router;
