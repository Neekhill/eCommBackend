const express = require("express");

const AuthService = require("../services/authService");
const UserService = require("../services/userService");
const router = express.Router();

//Update user
router.put(
  "/:id",
  AuthService.checkIfAuthenticatedAndAuthorizes,
  async (req, res) => {
    try {
      const updatedUser = await UserService.updateUser(req);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
