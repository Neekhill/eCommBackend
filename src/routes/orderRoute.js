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

//Update order
router.put(
  "/:id",
  AuthService.checkIfAuthenticatedAndAdmin,
  async (req, res) => {
    try {
      const updatedOrder = await OrderService.updateOrder(req);
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
