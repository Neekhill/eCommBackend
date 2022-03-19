const Products = require("../database/models/product");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcryptjs"));

async function createProduct(req) {
  const newProduct = new Products(req.body);
  return await newProduct.save();
}

async function updateProduct(req) {
  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  return updatedProduct;
}

async function deleteProduct(id) {
  try {
    const deletedProduct = await Products.findByIdAndDelete(id);
    return deletedProduct;
  } catch (err) {
    throw new Error(err);
  }
}

async function getProduct(id) {
  try {
    const product = await Products.findById(id);
    return product;
  } catch (err) {
    throw new Error(err);
  }
}

async function getProducts(qNew, qCategory) {
  let products;
  try {
    if (qNew) {
      products = await Products.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory === "allproducts") {
      products = await Products.find();
    } else if (qCategory) {
      products = await Products.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Products.find();
    }
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getProduct: getProduct,
  getProducts: getProducts,
};
