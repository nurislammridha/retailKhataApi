const express = require("express");
const router = express.Router();
const CrDr = require("../../models/CrDr.js");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {

    const crDr = new CrDr(req.body);
    await crDr.save();
    res.status(200).json({
      message: "Cr/Dr inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all crDr
router.get("/", async (req, res) => {
  try {
    await CrDr.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Cr DR list!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// CrDr By ID//
router.get("/:id", async (req, res) => {
  await CrDr.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "CrDr by id!",
        status: true,
      });
    }
  });
});

//Update CrDr
router.put("/:id", async (req, res) => {
  await CrDr.updateOne(
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
          message: "Cr/Dr were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//CrDr category
router.delete("/:id", async (req, res) => {
  await CrDr.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "CrDr was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
