const express = require("express");
const router = express.Router();
const User = require("../../models/User");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  try {
    user = new User(req.body);
    await user.save();
    res.status(200).json({
      message: "User created succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//Checking user phone number....
router.post("/phone", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    let phone = await User.findOne({ phoneNumber });
    if (phone) {
      return res.status(200).json({
        message: "Phone number already exist",
        isPhoneNumber: true,
        status: true,
      });
    } else {
      return res.status(200).json({
        message: "No phone number found",
        isPhoneNumber: false,
        status: true,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//Checking user Login....
router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    let data = await User.findOne({ phoneNumber });
    console.log(`data.password`, data.password);
    if (data && password !== data.password) {
      return res.status(400).json({
        message: "Please try with a valid password",
        isLogin: false,
        status: true,
      });
    } else {
      return res.status(400).json({
        message: "You are logging successfully!",
        isLogin: true,
        result: data,
        status: true,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all User
router.get("/", async (req, res) => {
  try {
    await User.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All user list showing..",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// User By ID//
router.get("/:id", async (req, res) => {
  await User.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "User details showing..",
        status: true,
      });
    }
  });
});

// Update User By User Id//
router.put("/:id", async (req, res) => {
  await User.updateOne(
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
          message: "User were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete category
router.delete("/:id", async (req, res) => {
  await User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "User was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
