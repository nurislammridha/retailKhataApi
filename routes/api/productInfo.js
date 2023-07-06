const express = require("express");
const router = express.Router();
const ProductInfo = require("../../models/ProductInfo");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {
    const productInfo = new ProductInfo(req.body);
    await productInfo.save();
    res.status(200).json({
      message: "Product inserted successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all product
router.get("/", async (req, res) => {
  try {
    await ProductInfo.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All product list!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Product By ID//
router.get("/:id", async (req, res) => {
  await ProductInfo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Product by id!",
        status: true,
      });
    }
  });
});

//Update product
router.put("/:id", async (req, res) => {
  await ProductInfo.updateOne(
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
          message: "Product were updated successfully!",
          status: true,
        });
      }
    }
  );
});
// Update product presentPricePerUnit
router.put("/presentPricePerUnit/:id", async (req, res) => {
  await ProductInfo.updateOne(
    { _id: req.params.id },
    {
      $set: { presentPricePerUnit: req?.body?.presentPricePerUnit },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Present Price PerUnit were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete product
router.delete("/:id", async (req, res) => {
  await ProductInfo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Product was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
