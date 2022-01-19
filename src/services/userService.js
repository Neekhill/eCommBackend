const Users = require("../database/models/user");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

async function updateUser(req) {
  if (req.body.password) {
    const salt = 10;
    req.body.password = await bcrypt.hash(password, salt);
  }
  const updatedUser = await Users.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  return updatedUser;
}

module.exports = {
  updateUser: updateUser,
};
