const Users = require("../database/models/user");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

module.exports = {
  createUser: createUser,
};
