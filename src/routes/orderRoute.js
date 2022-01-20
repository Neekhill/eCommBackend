const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");
const OrderService = require("../services/orderService");

//create
router.post("/", AuthService.checkIfAuthenticated, async (req, res) => {
  try {
    const savedOrder = await OrderService.createOrder(req);
    res.status(201).json({ message: "Order created successfully", savedOrder });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
