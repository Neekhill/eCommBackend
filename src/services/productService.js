const Products = require("../database/models/product");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

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

// async function getUser(id) {
//   try {
//     const user = await Users.findById(id);
//     return user;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// async function getUsers(query) {
//   try {
//     const users = query
//       ? await Users.find().sort({ _id: -1 }).limit(5) //by this we'll get latest users
//       : await Users.find();
//     return users;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// async function getMontlyUserStats(lastYear) {
//   try {
//     const data = await Users.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// }

module.exports = {
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
