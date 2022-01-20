const bluebird = require("bluebird");
const Orders = require("../database/models/order");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

async function createOrder(req) {
  const newOrder = new Orders(req.body);
  return await newOrder.save();
}

module.exports = {
  createOrder: createOrder,
};
