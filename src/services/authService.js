const Users = require("../database/models/user");
const AuthErrorCodes = require("./authError");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));
const TokenService = require("./tokenService");

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
};
