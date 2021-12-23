const mongoose = require("mongoose");
const orderSchema = require("../schema/order");

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
