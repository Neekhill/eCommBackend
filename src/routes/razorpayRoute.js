const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const Razorpay = require("razorpay");
const AuthService = require("../services/authService");

const razorpay = new Razorpay({
  key_id: "rzp_test_Qidn5zBgTBRiXC",
  key_secret: "880u98VddVTWuoL8vI7efgzz",
});

router.post("/razorpay", AuthService.checkIfAuthenticated, async (req, res) => {
  const payment_capture = 1;
  const totalAmount = req.body.amount;
  const currency = "INR";

  const options = {
    amount: totalAmount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
