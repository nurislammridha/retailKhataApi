const express = require("express");
const router = express.Router();
const Writter = require("../../models/Writter");
//@route POST api/writter
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    let writter = await Writter.findOne({ email });
    //see if user exists
    if (writter) {
      return res
        .status(400)
        .json({ message: "Writtter already exist with this email" });
    }
    writter = new Writter(req.body);
    await writter.save();
    res.status(200).json({
      message: "Writter created succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Category
router.get("/", async (req, res) => {
  try {
    await Writter.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Writter successfully!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Writter By ID
router.get("/:id", async (req, res) => {
  await Writter.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Writter get successfully!",
      });
    }
  });
});

//Update Writter
router.put("/:id", async (req, res) => {
  await Writter.updateOne(
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
          message: "Writter were updated successfully!",
          status: true,
        });
      }
    }
  );
});
//change password
router.post("/change_password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    await Writter.find({ email }, async (err, data) => {
      if (err) {
        res.status(400).json("Server error");
      } else {
        const [info] = data;
        if (data.length === 0) {
          res.status(400).json("You are not registered");
        } else if (info.password === oldPassword) {
          await Writter.updateOne(
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

//delete category
router.delete("/:id", async (req, res) => {
  await Writter.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Writter was deleted successfully!",
        status: true,
      });
    }
  });
});

//writter login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let adminInfo = await Writter.find({ email });
    let [data] = adminInfo;
    if (adminInfo.length === 0) {
      res.status(400).json("You are not registered");
    } else if (password !== data.password) {
      res.status(400).json("Password not matched");
    } else {
      res.json("Successfully login");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
