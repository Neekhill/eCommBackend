const Users = require("../database/models/user");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

// user register
function createUser({ username, email, password }) {
  return bcrypt.hash(password, 5).then((hashedPassword) => {
    const newUser = Users({
      username,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  });
}

module.exports = {
  createUser: createUser,
};
