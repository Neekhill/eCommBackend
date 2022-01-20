const bluebird = require("bluebird");
const Orders = require("../database/models/order");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

async function createOrder(req) {
  const newOrder = new Orders(req.body);
  return await newOrder.save();
}

async function updateOrder(req) {
  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  return updatedOrder;
}

async function deleteOrder(id) {
  try {
    const deletedOrder = await Orders.findByIdAndDelete(id);
    return deletedOrder;
  } catch (err) {
    throw new Error(err);
  }
}

async function getUserOrders(userId) {
  try {
    const orders = await Orders.find();
    return orders;
  } catch (err) {
    throw new Error(err);
  }
}

//get all Orders
async function getOrders() {
  try {
    const orders = await Orders.find();
    return orders;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createOrder: createOrder,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder,
  getUserOrders: getUserOrders,
  getOrders: getOrders,
};
