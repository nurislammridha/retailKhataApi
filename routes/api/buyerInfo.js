const express = require("express");
const router = express.Router();
const BuyerInfo = require("../../models/BuyerInfo");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {

    const buyerInfo = new BuyerInfo(req.body);
    await buyerInfo.save();
    res.status(200).json({
      message: "Customer inserted successfully",
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
    await BuyerInfo.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Our all customer list!",
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
  await BuyerInfo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Customer by id!",
        status: true,
      });
    }
  });
});

//Update DailyBuy
router.put("/:id", async (req, res) => {
  await BuyerInfo.updateOne(
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
          message: "Customer were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete category
router.delete("/:id", async (req, res) => {
  await BuyerInfo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Customer was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
