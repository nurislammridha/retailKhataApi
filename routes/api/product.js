const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
var multer = require("multer");
const path = require("path");
const folder = "./up/";
const fs = require("fs");
//define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

router.post(
  "/",
  upload.fields([
    { name: "product_image", maxCount: 1 },
    // { name: "product_code", maxCount: 1 },
  ]),
  async (req, res) => {
    const { product_image } = req.files;
    const {
      product_name,
      category_id,
      category_name,
      product_mrp,
      is_discount,
      discount_price,
      product_code,
      is_active,
      priority,
      discount_price_bn,
      product_mrp_bn,
      category_name_bn,
      product_name_bn,
    } = req.body;
    const [productImg] = product_image;
    // const [productCode] = product_code;
    var info = {
      productName: product_name,
      categoryId: category_id,
      categoryName: category_name,
      productMRP: product_mrp,
      isDiscount: is_discount,
      discountPrice: discount_price,
      productCode: product_code,
      productImage: productImg.path,
      isActive: is_active,
      priority: priority,
      productNameBn: product_name_bn,
      categoryNameBn: category_name_bn,
      productMRPBn: product_mrp_bn,
      discountPriceBn: discount_price_bn,
    };
    try {
      info = new Product(info);
      await info.save();
      res.status(200).json({
        message: "Inserted Successfully",
        status: true,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
// all Products
router.get("/", async (req, res) => {
  try {
    await Product.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Get successfully!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
// all Products by category
router.get("/:id", async (req, res) => {
  try {
    await Product.find({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Get successfully!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
// all Products by category which priority high for home page
router.get("/home/:id", async (req, res) => {
  try {
    await Product.find(
      { categoryId: req.params.id, priority: "High" },
      (err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            result: data,
            message: "Get successfully!",
            status: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Server error");
  }
});
// all Products  which priority high and active for home page////
router.get("/smart/home", async (req, res) => {
  try {
    await Product.find({ priority: "High" }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Get successfully!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//Update Product
router.put(
  "/:id",
  upload.fields([{ name: "product_image", maxCount: 1 }]),
  async (req, res) => {
    const { product_image } = req.files;
    const {
      product_name,
      category_id,
      category_name,
      product_mrp,
      is_discount,
      discount_price,
      product_code,
      is_active,
      priority,
      product_name_bn,
      category_name_bn,
      product_mrp_bn,
      discount_price_bn,
    } = req.body;

    var info = {
      productName: product_name,
      categoryId: category_id,
      categoryName: category_name,
      productMRP: product_mrp,
      isDiscount: is_discount,
      discountPrice: discount_price,
      productCode: product_code,
      isActive: is_active,
      priority: priority,
      productNameBn: product_name_bn,
      categoryNameBn: category_name_bn,
      productMRPBn: product_mrp_bn,
      discountPriceBn: discount_price_bn,
    };

    //delete before thumbnail imag
    if (product_image !== undefined) {
      await Product.find({ _id: req.params.id }, (err, data) => {
        const [info] = data;
        if (info.productImage !== null) {
          fs.unlinkSync(info.productImage);
        }
      });
      const [productImg] = product_image;
      info.productImage = productImg.path;
    }

    //Now updated
    await Product.updateOne(
      { _id: req.params.id },
      {
        $set: info,
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
  }
);
// //Update Thumbnail Images
// router.put(
//   "/thumbnail/:id",
//   upload.single("thumbnail_img"),
//   async (req, res) => {
//     const thumbnail_img = req.file;
//     var info = {
//       thumbnailImg: thumbnail_img.path,
//     };
//     //delete before thumbnail imag
//     await NewsImg.find({ newsId: req.params.id }, (err, data) => {
//       const [info] = data;
//       fs.unlinkSync(info.thumbnailImg);
//     });

//Now updated
//     await NewsImg.updateOne(
//       { newsId: req.params.id },
//       {
//         $set: info,
//       },
//       (err) => {
//         if (err) {
//           res.status(500).json({
//             error: "There was a server side error!",
//           });
//         } else {
//           res.status(200).json({
//             message: "Thumbnail were updated successfully!",
//             status: true,
//           });
//         }
//       }
//     );
//   }
// );
//before hide poart
// router.put("/feature/:id", async (req, res) => {
//   await Category.updateOne(
//     { _id: req.params.id },
//     {
//       $set: req.body,
//     },
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           error: "There was a server side error!",
//         });
//       } else {
//         res.status(200).json({
//           message: "Category were updated successfully!",
//         });
//       }
//     }
//   );
// });

//delete Product
router.delete("/:id", async (req, res) => {
  await Product.find({ _id: req.params.id }, (err, data) => {
    const [info] = data;
    fs.unlinkSync(info.productImage);
  });
  await Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Product Img was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
