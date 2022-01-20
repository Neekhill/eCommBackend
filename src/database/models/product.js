const mongoose = require("mongoose");
const productSchema = require("../schema/product");

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
