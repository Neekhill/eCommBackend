const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");
const CartService = require("../services/cartService");

//create
router.post("/", AuthService.checkIfAuthenticated, async (req, res) => {
  try {
    const savedCart = await CartService.createCart(req);
    res.status(201).json({ message: "Cart created successfully", savedCart });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update cart
router.put(
  "/:id",
  AuthService.checkIfAuthenticatedAndAuthorizes,
  async (req, res) => {
    try {
      const updatedCart = await CartService.updateCart(req);
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//delete cart
router.delete(
  "/:id",
  AuthService.checkIfAuthenticatedAndAuthorizes,
  async (req, res) => {
    try {
      const deletedCart = await CartService.deleteCart(req.params.id);
      res.status(200).json({
        message: "Cart deleted successfully",
        deletedCart,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//Get user cart
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await CartService.getUserCart(req.params.userId);
    res.status(200).json({
      cart,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get all cartss
router.get("/", AuthService.checkIfAuthenticatedAndAdmin, async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    res.status(200).json({
      carts,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
