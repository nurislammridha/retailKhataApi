const express = require("express");
const router = express.Router();
const DailySell = require("../../models/DailySell");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {

    const dailySell = new DailySell(req.body);
    await dailySell.save();
    res.status(200).json({
      message: "Sell inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all DailySell
router.get("/", async (req, res) => {
  try {
    await DailySell.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All selling product!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// DailySell By ID//
router.get("/:id", async (req, res) => {
  await DailySell.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "All selling product by id!",
        status: true,
      });
    }
  });
});
// DailySell By Date//
router.get("/date/:id", async (req, res) => {
  await DailySell.find({ date: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      // let [obj] = data;
      res.status(200).json({
        result: data,
        message: "All selling product by date!",
        status: true,
      });
    }
  });
});

//Update DailySell
router.put("/:id", async (req, res) => {
  await DailySell.updateOne(
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
          message: "DailySell were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete category
router.delete("/:id", async (req, res) => {
  await DailySell.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "DailySell was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
