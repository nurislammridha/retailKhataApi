const express = require("express");
const router = express.Router();
const DailyBuy = require("../../models/DailyBuy");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {
    const dailyBuy = new DailyBuy(req.body);
    await dailyBuy.save();
    res.status(200).json({
      message: "Buying added successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all DailyBuy
router.get("/", async (req, res) => {
  try {
    await DailyBuy.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All buying product!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// DailyBuy By ID//
router.get("/:id", async (req, res) => {
  await DailyBuy.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "All buying product by id!",
        status: true,
      });
    }
  });
});
// DailyBuy By Date//
router.get("/date/:id", async (req, res) => {
  await DailyBuy.find({ date: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      // let [obj] = data;
      res.status(200).json({
        result: data,
        message: "All buying product by date!",
        status: true,
      });
    }
  });
});
//Update DailyBuy
router.put("/:id", async (req, res) => {
  await DailyBuy.updateOne(
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
          message: "DailyBuy were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete DailyBuy
router.delete("/:id", async (req, res) => {
  await DailyBuy.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "DailyBuy was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
