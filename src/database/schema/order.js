const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
      },
      {
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true } // this will created at, updated at timestamps
);

module.exports = cartSchema;
