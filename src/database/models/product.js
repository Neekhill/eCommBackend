const mongoose = require("mongoose");
const prouctSchema = require("../schema/product");

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
