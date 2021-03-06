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

//delete order
router.delete(
  "/:id",
  AuthService.checkIfAuthenticatedAndAdmin,
  async (req, res) => {
    try {
      const deletedOrder = await OrderService.deleteOrder(req.params.id);
      res.status(200).json({
        message: "Order deleted successfully",
        deletedOrder,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//Get user order
// :id is userId
router.get(
  "/find/:id",
  AuthService.checkIfAuthenticatedAndAuthorizes,
  async (req, res) => {
    try {
      const orders = await OrderService.getUserOrders(req.params.id);
      res.status(200).json({
        orders,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//Get all Orders
router.get("/", AuthService.checkIfAuthenticatedAndAdmin, async (req, res) => {
  try {
    const orders = await OrderService.getOrders();
    res.status(200).json({
      orders,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//get montly income
router.get(
  "/income",
  AuthService.checkIfAuthenticatedAndAdmin,
  async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await OrderService.getMontlyIncome(
        lastMonth,
        previousMonth
      );
      res.status(200).json({
        income,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = router;
