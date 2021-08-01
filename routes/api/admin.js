const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Admin = require("../../models/Admin");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("password", "Password at least 6 charecters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      //see if user exists
      if (admin) {
        return res.status(400).json({ msg: "Admin already exist" });
      }
      admin = new Admin({ name, email, password });
      await admin.save();
      res.json("Admin registered succesfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
//@route POST api/admin/login
//@desc Admin login
//@access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(`req.body`, req.body);
  try {
    let adminInfo = await Admin.findOne();

    if (email !== adminInfo.email) {
      res.status(400).json({
        message: "You are not registered",
        status: false,
      });
    } else if (password !== adminInfo.password) {
      res.status(400).json({
        message: "Password not matched",
        status: false,
      });
    } else {
      res.json({
        message: "Successfully loged in",
        status: true,
      });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//Change Password
//change password
router.post("/change_password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    await Admin.find({ email }, async (err, data) => {
      if (err) {
        res.status(400).json("Server error");
      } else {
        const [info] = data;
        if (data.length === 0) {
          res.status(400).json("You are not registered");
        } else if (info.password === oldPassword) {
          await Admin.updateOne(
            { email: email },
            {
              $set: { password: newPassword },
            },
            (err) => {
              if (err) {
                res.status(500).json({
                  error: "There was a server side error!",
                });
              } else {
                res.status(200).json({
                  message: "Password changed successfully!",
                  status: true,
                });
              }
            }
          );
        } else {
          res.status(400).json("Password not matched");
        }
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
