const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");
const ProductService = require("../services/productService");

//create new product
router.post("/", AuthService.checkIfAuthenticatedAndAdmin, async (req, res) => {
  try {
    const savedProduct = await ProductService.createProduct(req);
    res
      .status(201)
      .json({ message: "product created successfully", savedProduct });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update product
router.put(
  "/:id",
  AuthService.checkIfAuthenticatedAndAdmin,
  async (req, res) => {
    try {
      const updatedProduct = await ProductService.updateProduct(req);
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//delete product
router.delete(
  "/:id",
  AuthService.checkIfAuthenticatedAndAdmin,
  async (req, res) => {
    try {
      const deletedProduct = await ProductService.deleteProduct(req.params.id);
      res.status(200).json({
        message: "product deleted successfully",
        deletedProduct,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//Get product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await ProductService.getProduct(req.params.id);
    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get all products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    const products = await ProductService.getProducts(qNew, qCategory);
    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
