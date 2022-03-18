const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {
    let order = new Order(req.body);
    await order.save();
    res.status(200).json({
      message: "Order created succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Order List
router.get("/", async (req, res) => {
  try {
    await Order.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Orders are showing successfully!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
//all Order list by status
router.get("/status", async (req, res) => {
  const { date, status } = req.query;

  try {
    await Order.find({ orderDate: date, [status]: false }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Orders are showing successfully!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Order By ID// Order details
router.get("/:id", async (req, res) => {
  await Order.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Order showing!",
        status: true,
      });
    }
  });
});
// Order By Date 23-12-0000
router.get("/date/:id", async (req, res) => {
  await Order.find({ orderDate: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Order showing!",
        status: true,
      });
    }
  });
});
// Order By userID
router.get("/user/:id", async (req, res) => {
  await Order.find({ userId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Order showing!",
        status: true,
      });
    }
  });
});

//Update Order By Order Id
router.put("/:id", async (req, res) => {
  await Order.updateOne(
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
          message: "Order were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete Order by Order id
router.delete("/:id", async (req, res) => {
  await Order.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Order was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
