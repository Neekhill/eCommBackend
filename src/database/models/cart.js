const mongoose = require("mongoose");
const cartSchema = require("../schema/cart");

const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;
