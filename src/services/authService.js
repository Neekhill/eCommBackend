const Users = require("../database/models/user");
const AuthErrorCodes = require("./authError");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));
const TokenService = require("./tokenService");

//register user
async function registerUser({ username, email, password }) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = Users({
    username,
    email,
    password: hashedPassword,
  });
  return await newUser.save();
}

async function login(email, reqpassword) {
  const user = await Users.findOne({ email: email });
  console.log(user);
  if (user === null) {
    throw new Error(AuthErrorCodes.AuthErrorCodes.INVALID_EMAIL);
  }
  const result = await bcrypt.compare(reqpassword, user.password);
  if (!result) {
    throw new Error(AuthErrorCodes.AuthErrorCodes.INVALID_PASSWORD);
  }
  console.log(`user = ${JSON.stringify(user)}`);
  const token = await TokenService.generateToken(user._id);
  const { password, ...others } = user._doc;

  return { ...others, token };
}

async function checkIfAuthenticated(req, res, next) {
  const authHeader = req.headers.Authorization;
  // Bearer Token
  if (typeof authHeader === "undefined" || authHeader == null) {
    res.status(401).send("Token not found!");
  }
  token = authHeader.split(" ")[1];
  try {
    const user = await TokenService.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
}

function checkIfAuthenticatedAndAuthorizes(req, res, next) {
  checkIfAuthenticated(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "You're not allowed to update this" });
    }
  });
}

module.exports = {
  login: login,
  registerUser: registerUser,
  checkIfAuthenticated: checkIfAuthenticated,
  checkIfAuthenticatedAndAuthorizes: checkIfAuthenticatedAndAuthorizes,
};
