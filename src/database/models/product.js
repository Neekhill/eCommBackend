const mongoose = require("mongoose");
const prouctSchema = require("../schema/product");

const Products = mongoose.model("Todos", productSchema);

module.exports = Products;
