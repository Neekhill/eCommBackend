const bluebird = require("bluebird");
const Carts = require("../database/models/cart");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

async function createCart(req) {
  const newCart = new Carts(req.body);
  return await newCart.save();
}

async function updateCart(req) {
  const updatedCart = await Carts.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  return updatedCart;
}

async function deleteCart(id) {
  try {
    const deletedCart = await Carts.findByIdAndDelete(id);
    return deletedCart;
  } catch (err) {
    throw new Error(err);
  }
}

async function getUserCart(userId) {
  try {
    const cart = await Carts.findOne({ userId: userId });
    return cart;
  } catch (err) {
    throw new Error(err);
  }
}

//get all carts
async function getCarts() {
  try {
    const carts = await Carts.find();
    return carts;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createCart: createCart,
  updateCart: updateCart,
  deleteCart: deleteCart,
  getUserCart: getUserCart,
  getCarts: getCarts,
};
