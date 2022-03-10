const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    _id: { type: String },
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        img: {
          type: String,
        },
        price: {
          type: String,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
  { _id: false }
);

module.exports = OrderSchema;
