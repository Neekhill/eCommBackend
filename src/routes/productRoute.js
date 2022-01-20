const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");
const ProductService = require("../services/productService");

//create new product
router.post("/", async (req, res) => {
  try {
    const savedProduct = await ProductService.createProduct(req);
    res
      .status(201)
      .json({ message: "product created successfully", savedProduct });
  } catch (error) {
    res.status(500).send(error);
  }
});

// //Update user
// router.put(
//   "/:id",
//   AuthService.checkIfAuthenticatedAndAuthorizes,
//   async (req, res) => {
//     try {
//       const updatedUser = await UserService.updateUser(req);
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

// //delete user
// router.delete(
//   "/:id",
//   AuthService.checkIfAuthenticatedAndAuthorizes,
//   async (req, res) => {
//     try {
//       const deletedUser = await UserService.deleteUser(req.params.id);
//       res.status(200).json({
//         message: "user deleted successfully",
//         deletedUser,
//       });
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }
// );

// //get user - only admin can get user
// router.get(
//   "/find/:id",
//   AuthService.checkIfAuthenticatedAndAdmin,
//   async (req, res) => {
//     try {
//       const user = await UserService.getUser(req.params.id);
//       const { password, ...others } = user._doc;
//       res.status(200).json({
//         others,
//       });
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }
// );

// //Get all users
// router.get("/", AuthService.checkIfAuthenticatedAndAdmin, async (req, res) => {
//   const query = req.query.new;
//   try {
//     const users = await UserService.getUsers(query);
//     res.status(200).json({
//       users,
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// //Get users monthly stats i.e how many users joined every month
// router.get("/stats", async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//   console.log(lastYear);
//   try {
//     const data = await userService.getMontlyUserStats(lastYear);
//     res.status(200).json({
//       data,
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
