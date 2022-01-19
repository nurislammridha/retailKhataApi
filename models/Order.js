const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  nickName: {
    type: String,
    require: true,
  },
  profession: {
    type: String,
    require: true,
  },
  village: {
    type: String,
    require: true,
  },
  villageArea: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  foundDescription: {
    type: String,
    require: true,
  },
  orderDate: {
    type: String,
    require: true,
  },
  productInfo: [
    {
      _id: {
        type: String,
        require: true,
      },
      quantity: {
        type: String,
        require: true,
      },
      productName: {
        type: String,
        require: true,
      },
      categoryId: {
        type: String,
        require: true,
      },
      categoryName: {
        type: String,
        require: true,
      },
      productMRP: {
        type: String,
        require: true,
      },
      isDiscount: {
        type: String,
        require: true,
      },
      discountPrice: {
        type: String,
        require: true,
      },
      productCode: {
        type: String,
        require: true,
      },
      productImage: {
        type: String,
        require: true,
      },
    },
  ],
  status: [
    {
      isCreated: {
        type: Boolean,
        require: true,
      },
      isCreatedDate: {
        type: String,
        require: true,
      },
      isAccepted: {
        type: Boolean,
        default: false,
      },
      isAcceptedDate: {
        type: String,
        default: "",
      },
      isProcessing: {
        type: Boolean,
        default: false,
      },
      isProcessingDate: {
        type: String,
        default: "",
      },
      isDelivering: {
        type: Boolean,
        default: false,
      },
      isDeliveringDate: {
        type: String,
        default: "",
      },
      isDelivered: {
        type: Boolean,
        default: false,
      },
      isDeliveredDate: {
        type: String,
        default: "",
      },
    },
  ],
});
module.exports = Order = mongoose.model("Order", OrderSchema);
