const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    categories: { type: Array },
    sizes: { type: Array },
    colors: { type: Array },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = productSchema;
