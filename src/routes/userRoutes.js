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

//delete user
router.delete(
  "/:id",
  AuthService.checkIfAuthenticatedAndAuthorizes,
  async (req, res) => {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      res.status(200).json({
        message: "user deleted successfully",
        deletedUser,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//get user - only admin can get user
router.get(
  "/find/:id",
  AuthService.checkIfAuthenticatedAndAdmin,
  async (req, res) => {
    try {
      const user = await UserService.getUser(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json({
        others,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = router;
