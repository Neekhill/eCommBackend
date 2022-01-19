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

function login(email, password) {
  return Users.findOne({ email: email }).then((user) => {
    if (typeof user !== "undefined" && user !== null) {
      return bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          console.log(`user = ${JSON.stringify(user)}`);
          return TokenService.generateToken(user._id);
        } else {
          return Promise.reject(AuthErrorCodes.AuthErrorCodes.INVALID_PASSWORD);
        }
      });
    } else {
      return Promise.reject(AuthErrorCodes.AuthErrorCodes.INVALID_EMAIL);
    }
  });
}

module.exports = {
  login: login,
  registerUser: registerUser,
};
