const express = require("express");
const router = express.Router();
const DealerInfo = require("../../models/DealerInfo");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {

    const dealerInfo = new DealerInfo(req.body);
    await dealerInfo.save();
    res.status(200).json({
      message: "Dealer added successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Dealer info
router.get("/", async (req, res) => {
  try {
    await DealerInfo.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All dealer list!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// dealer By ID//
router.get("/:id", async (req, res) => {
  await DealerInfo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Dealer by id!",
        status: true,
      });
    }
  });
});

//Update DealerInfo
router.put("/:id", async (req, res) => {
  await DealerInfo.updateOne(
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
          message: "Dealer info were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete DealerInfo
router.delete("/:id", async (req, res) => {
  await DealerInfo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Dealer was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
