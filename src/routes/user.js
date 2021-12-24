const express = require("express");
const router = express.Router();
const userService = require("../services/user");

router.post("/register", (req, res) => {
  let { username, email, password } = req.body;
  userService
    .createUser({
      username,
      email,
      password,
    })
    .then(() => {
      console.log("user created successfully ");
      res.status(201).send("user created successfully ");
    })
    .catch((err) => {
      console.log(`Error in creation ${err}`);
      res.status(501).send("User not created, due to error");
    });
});

module.exports = router;
