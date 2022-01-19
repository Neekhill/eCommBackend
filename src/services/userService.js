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

async function deleteUser(id) {
  try {
    const deletedUser = await Users.findByIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    throw new Error(err);
  }
}

async function getUser(id) {
  try {
    const user = await Users.findById(id);
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUser: getUser,
};
