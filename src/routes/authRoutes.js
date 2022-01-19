const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (
    username === "undefined" ||
    email === "undefined" ||
    password === "undefined"
  ) {
    res.status(400).send("Invalid parameters");
  }

  try {
    const newUserCreated = await AuthService.registerUser({
      username,
      email,
      password,
    });
    console.log("user created successfully ");
    res.status(201).json({
      message: "user created successfully ",
      createdUser: newUserCreated,
    });
  } catch (error) {
    console.log(`Error in creation ${err}`);
    res.status(501).send("User not created, due to error");
  }
});

router.get("/login", (req, res) => {
  if (
    typeof req.query.email === "undefined" ||
    typeof req.query.password === "undefined"
  ) {
    res.status(400).send("Invalid parameters");
  } else {
    console.log(`query = ${JSON.stringify(req.query)}`);
    AuthService.login(req.query.email, req.query.password)
      .then((token) => {
        res.send(token);
      })
      .catch((errcode) => {
        console.log(`errcode = ${errcode}`);
        res.status(401).send(errcode);
      });
  }
});

module.exports = router;
